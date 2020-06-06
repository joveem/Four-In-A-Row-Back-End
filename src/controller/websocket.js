var socket_io = require('socket.io');

var { AddConnection, GetConnectionById, SetUpConnectionMinigame, RemoveConnection, GetFiarPublicQueue, SetFiarPublicQueue, FiarQueuePlayer, FiarAddGame } = require('../model/socket_connections');
var { GetUserById } = require('../model/users');

var io;

exports.setUpWebSockets = function (server) {

    io = socket_io(server);

    io.on('connection', function (socket) {

        AddConnection(socket.id);

        socket.emit("connecting", {});

        socket.on("send-configs-to-server", function (pack) {

            var connection_already_exists = SetUpConnectionMinigame(socket.id, pack.player_id, pack.minigame_number);

            socket.emit("send-connection-result-to-client", { result: !connection_already_exists ? "succeed" : "failed" });

        })

        socket.on("fiar-enter-random-room", function (pack) {

            FiarQueuePlayer(socket.id, GetUserById(GetConnectionById(socket.id).player_infos.id).nick, pack.langs);/////////////////////////////////

        })

        socket.on("send-position-to-server", function (pack) {

            socket.broadcast.emit("send-position-to-client", pack);

        })

        socket.on("send-piece-move-to-server", function (pack) {

            socket.broadcast.emit("send-piece-move-to-client", pack);

        })

        socket.on("send-message-to-server", function (pack) {

            socket.emit("send-message-to-client", pack);
            socket.broadcast.emit("send-message-to-client", pack);

        })


        socket.on("disconnect", function () {

            RemoveConnection(socket.id);

        });

    });

}

exports.FiarDealWithPublicQueue = function () {

    var matchs = [];
    var socket_ids_to_remove = [];

    var fiar_public_queue = GetFiarPublicQueue();

    fiar_public_queue.map(function (value_1) {

        if (!value_1.combined) {

            fiar_public_queue.map(function (value_2) {

                if (value_2.socket_id != value_1.socket_id) {

                    if (!value_2.combined) {

                        var intersection = value_2.langs.filter(function (x) {

                            if (value_1.langs.indexOf(x) != -1) {

                                return true;

                            } else {

                                return false;

                            }

                        })

                        console.log(intersection);

                        if (intersection.length != 0) {

                            value_1.combined = true;
                            value_2.combined = true;

                            matchs.push({

                                socket_id_1: value_1.socket_id,
                                socket_id_2: value_2.socket_id,
                                player_1_nick: value_1.nick,
                                player_2_nick: value_2.nick

                            })

                            socket_ids_to_remove.push(value_1.socket_id, value_2.socket_id);

                        }

                    }

                }

            })

        }

    })

    matchs.map(function (value) {

        console.log("- - - " + value.player_1_nick + " - " + value.player_2_nick)

        var player_1_pack = {

            player_number: 1,
            player_1_nick: value.player_1_nick,
            player_2_nick: value.player_2_nick

        };

        var player_2_pack = {

            player_number: 2,
            player_1_nick: value.player_1_nick,
            player_2_nick: value.player_2_nick

        };

        io.to(value.socket_id_1).emit("open-game", player_1_pack);
        io.to(value.socket_id_2).emit("open-game", player_2_pack);

        console.log(player_1_pack);
        console.log(player_2_pack);

        var room_name = value.socket_id_1 + "-" + value.socket_id_2;

        io.sockets.connected[value.socket_id_1].join(room_name);
        io.sockets.connected[value.socket_id_2].join(room_name);

        FiarAddGame(room_name);

        console.log("- starting game for " + value.socket_id_1 + " and " + value.socket_id_2 + " ( " + room_name + " )");

    })

    socket_ids_to_remove.map(function (value) {

        fiar_public_queue.splice(fiar_public_queue.findIndex(x => x.socket_id == value), 1);

        console.log("( " + value + " removed from queue )");

    })

    SetFiarPublicQueue(fiar_public_queue);

}

exports.UpdatePlayersQuantity = function (players_quant_) {

    io.emit("update-players-quantity", { players_quant: players_quant_ });

}
