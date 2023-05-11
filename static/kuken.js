

window.onload = function () {
    taEmotSkit()

}

function skickaSkit(){
    let entry = document.getElementById('formform')
    let req = new XMLHttpRequest();
        req.open("POST", "/send", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    // Initialize login
                   
                }
                else {
                    console.log("Ånej");
                }
            }
        }
        let date = new Date();
        let dateString =  date.getDate() + " " + date.getMonth();
        req.send(JSON.stringify({'namn':entry.namn, 'text':entry.text, 'date':dateString}));
        return false;
};


function taEmotSkit(){
    let req = new XMLHttpRequest();
        req.open("GET", "/get", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    // Initialize login
                    messages = JSON.parse(req.responseText);
                    console.log("JAA");
                    let lista = document.getElementById('lista');
                    if (messages.entries.length > 0) {
                        while (lista.firstChild) {
                            lista.removeChild(lista.firstChild);
                        }
                        messages.entries.forEach(element => {
                            let message = document.createElement("li");
                            let writer = document.createElement("p");
                            writer.innerHTML = element.namn + " skrev " + element.date + ": ";
                            message.appendChild(writer);
    
                            let content = document.createElement("p");
                            content.innerHTML = element.text;
                            message.appendChild(content);
                            lista.appendChild(message);
                        });
                    }
                }
                else {
                    console.log("Ånej 2")
                }

            }

        }
        req.send()
        return false;

}