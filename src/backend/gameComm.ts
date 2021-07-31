import WeightedDiceDeckController, { IDicePair } from "./DiceDeck";

interface UserData {
  socketId: string;
  loginTime: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  color: string;

  diceResult: IDicePair | undefined;
}

interface RecentData {
  socketId: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;

  diceResult: IDicePair | undefined;
}

export function GameCommunication(io, socket, currentUsers) {
  let recentUpdates: RecentData[] = []; //array to store socketids and player data of each connection
  let diceDeck: WeightedDiceDeckController = new WeightedDiceDeckController();
  let diceResults = new Map<string, IDicePair | undefined>();

  socket.on("player roll dice", (data: { socketId: string }) => {
    diceResults.set(data.socketId, diceDeck.throwDice());
    io.sockets.emit("update dice", data, diceResults.get(data.socketId));
  });

  socket.on("player update", function (data: UserData) {
    let p = recentUpdates.filter((update) => update.socketId == data.socketId);
    if (p && p[0]) {
      let player = p[0];
      player.x = data.x;
      player.y = data.y;
      player.angle = data.angle;
      (player.vx = data.vx), (player.vy = data.vy);
      player.diceResult = data.diceResult;
    } else {
      recentUpdates.push(data);
    }
  });

  socket.on("ready", () => {
    let newPlayer = createNewUser(socket);
    socket.emit("first hi", newPlayer, currentUsers);
    socket.broadcast.emit("add opponent", newPlayer);
    currentUsers.push(newPlayer); //add user for data tracking/sharing
  });

  setInterval(() => {
    io.emit("update all", recentUpdates);
    recentUpdates.forEach((data) => {
      let p = currentUsers.filter((user: UserData) => {
        return user.socketId == data.socketId;
      });
      if (p && p[0]) {
        let player = p[0];
        player.x = data.x;
        player.y = data.y;
        player.angle = data.angle;
        (player.vx = data.vx), (player.vy = data.vy);
        player.diceResult = data.diceResult;
      }
    });
    recentUpdates.length = 0;
  }, 100 / 30);

  function createNewUser(socket) {
    let d = new Date();
    let time = d.toLocaleString("en-US", {
      hour12: false,
      timeZone: "Europe/Stockholm",
    });

    let user: UserData = {
      socketId: socket.id,
      loginTime: new Date().getTime(),
      x: 200 + Math.random() * 600,
      y: 100 + Math.random() * 200,
      angle: Math.random() * 180,
      color: "0x" + Math.floor(Math.random() * 16777215).toString(16),
      vx: 1 - Math.random() * 2,
      vy: 1 - Math.random() * 2,
      diceResult: diceResults.get(socket.id),
    };
    return user;
  }
}
