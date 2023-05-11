
const manader = {
    1:'Januari', 2:'Februari', 3:'Mars', 4:'April', 5:'Maj', 6:'Juni', 7:'Juli',8:'Augusti', 9:'September', 10:'Oktober', 11:'November', 12:'December'
}

window.onload = function () {
    taEmotSkit()

}

function skickaSkit(entry) {
    console.log(entry);
    let req = new XMLHttpRequest();
    req.open("POST", "/send", true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                // Initialize login
                taEmotSkit();
                return false;

            }
            else {
            }
        }
    }
    let date = new Date();
    let dateString = date.getDate() + " " + manader[date.getMonth()];
    req.send(JSON.stringify({ 'namn': entry.namn.value, 'text': entry.text.value, 'date': dateString }));
    return false;
};

function taEmotSkit() {
    let req = new XMLHttpRequest();
    req.open("GET", "/get", true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                // Initialize login
                messages = JSON.parse(req.responseText);
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
            }

        }

    }
    req.send()
    return false;

}