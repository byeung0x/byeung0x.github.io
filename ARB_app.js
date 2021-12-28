let ws = '';
var book = {};
let ws_Bi = null
let Bi_status = document.getElementById("existing_")
const table = document.getElementById("CoinList");
let kill_switch = false;
let id = -1;
  
function ws_initiate() 
  {
    if ("WebSocket" in window)
      { 
        if (ws_Bi == null)
          {
            ws_Bi = new WebSocket("wss://stream.binance.com:9443/ws/!bookTicker");
          }
        else
          {
            Bi_status.innerHTML = "Please close previous connection first.";
            return
          };

        ws_Bi.onopen = function() 
          {
            Bi_status.innerHTML = "Websocket data Active."
            console.log("Subscribing Binance market data...");
          };


        ws_Bi.onmessage = function (evt) 
          {
            let message = JSON.parse(evt.data);


            let target = message['s'];
            let coin = target.substring(0,target.length - 4);
            let b = message['b'];
            let a = message['a'];
            
            if (target.substring(target.length - 4).includes("BUSD") || target.substring(target.length - 4).includes("USDT"))
              {

                if (typeof book[coin] == 'undefined')
                  {
                    book[coin] = {}
                  };

                book[coin][target] = [b,a];

                if (typeof book[coin][coin + "BUSD"] != 'undefined' && typeof book[coin][coin + "USDT"] != 'undefined')
                  {
                    let LUSDT = ((Number(book[coin][coin + "BUSD"][0])*(1-0.00075)) * Number(book.BUSD.BUSDUSDT[0])) / (Number(book[coin][coin + "USDT"][1])*(1+0.00075));
                    let LBUSD = ((Number(book[coin][coin + "USDT"][0])*(1-0.00075)) / Number(book.BUSD.BUSDUSDT[1])) / (Number(book[coin][coin + "BUSD"][1])*(1+0.00075));                                                                                              
                        
                    if (!document.getElementById("coin_" + coin))
                      {
                        if (LUSDT > 1 || LBUSD > 1)
                          {
                            let row = table.insertRow(table.rows.length);
                            row.setAttribute("id", "row_" + coin);
                            let cell1 = row.insertCell(0);
                            cell1.setAttribute("id", "coin_" + coin);
                            cell1.innerHTML = coin;
                            let cell2  = row.insertCell(1);
                            cell2.setAttribute("id", "LBUSD_" + coin);
                            let cell3 = row.insertCell(2);
                            cell3.setAttribute("id", "LUSDT_" + coin);
                            let cell4 = row.insertCell(3);
                            cell4.setAttribute("id", "t_" + coin)

                          }
                      }
                    else if (LUSDT < 0.999 && LBUSD < 0.999)
                      {
                        document.getElementById("row_" + coin).remove()
                      }
                    else
                      { 
                        document.getElementById("LUSDT_" + coin).innerHTML = LUSDT.toFixed(4); 
                        document.getElementById("LBUSD_" + coin).innerHTML = LBUSD.toFixed(4);
                        document.getElementById("t_" + coin).innerHTML = new Date()
                      }
                  }     
               }
          };

        ws_Bi.onclose = function() 
          {
            Bi_status.innerHTML = "Websocket Closed."
            console.log("Binance websocket connection aborbed");
            if (kill_switch == true)
              {
                kill_switch = false;
              }
            else
              {
                ws_Bi = null;
                setTimeout(ws_initiate, 5000);
                console.log("Reconnecting Binance websocket...")
              }
          }
      } 
    else
      {
        console.log("Browser do not support websocket...");
      }
  };

function ws_close()
 {
  Bi_status.innerHTML = "Closing websocket data stream."
  kill_switch = true;
  ws_Bi.close();
  ws_Bi = null
 };

<!-- function 2 : make account balance -->
const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: '7k1hK1huz5edd2EgnLJsK4OSPKncq2J9gkVK1rQ5IXcpB2PdmiMnEeof9fwNSIYc',
  APISECRET: 'bphe59faHE8nV5oNyb1YCVfBXgZqSJ6fRBPrSFVgVS3T9GlIPFLZhn7qub3ClDAD'
});

<!-- 7k1hK1huz5edd2EgnLJsK4OSPKncq2J9gkVK1rQ5IXcpB2PdmiMnEeof9fwNSIYc bphe59faHE8nV5oNyb1YCVfBXgZqSJ6fRBPrSFVgVS3T9GlIPFLZhn7qub3ClDAD 1640679251344577451 testnet binance -->

