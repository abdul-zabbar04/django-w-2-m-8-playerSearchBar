const searched_value= ()=>{
    const value= document.getElementById("searched-value").value;   
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${value}`)
    .then(res=>res.json())
    .then(data=>{
        // console.log(data);
        arr= data.player
        const player_container= document.getElementById("player-container")
        player_container.innerHTML= "";
        console.log(data);
        if(arr!=null)
            {
                arr.forEach(player=>{
                    const div= document.createElement("div")
                    div.classList.add("player-card")
                    div.innerHTML=`
                        <img src=${player.strThumb} width="200px" height="200px">
                        <li>Name: ${player.strPlayer}</li>
                        <li>id: ${player.idPlayer}</li>
                        <li>Role: ${player.strSport}</li>
                        <li>Nationality: ${player.strNationality}</li>
                        <li>Gender: ${player.strGender}</li>
                        <li>Club:${player.strTeam}</li>
                        <a href=${player.strFacebook}><i class="fa-brands fa-facebook"></i></a>
                        <a href=${player.strInstagram}><i class="fa-brands fa-instagram"></i></a><br>
                        <button id= "add-button${player.idPlayer}" class="btn bg-info mt-1 p-1" onclick="addGroup('${player.strThumb}','${player.strPlayer}','${player.idPlayer}')"><span>Add to group</span></button><br>
                        <button class="btn bg-primary mt-1 p-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="playerDetails(${player.idPlayer})">Details</button>
                    `
                    player_container.appendChild(div);
                })
            }
        else{
            const h1= document.createElement("h1");
            h1.innerText="No Result Found";
            player_container.appendChild(h1);
            console.log("reached");
            
        }
        document.getElementById("searched-value").value= "";
    })

}

const default_display= ()=>{
    const player_container= document.getElementById("player-container")
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=a`)
    .then(res=>res.json())
    .then(data=>{
        arr= data.player
        arr.forEach(player=>{
            const div= document.createElement("div")
            div.classList.add("player-card")
            div.innerHTML=`
                <img src=${player.strThumb} width="200px" height="200px">
                <li>Name: ${player.strPlayer}</li>
                <li>id: ${player.idPlayer}</li>
                <li>Role: ${player.strSport}</li>
                <li>Nationality: ${player.strNationality}</li>
                <li>Gender: ${player.strGender}</li>
                <li>Club:${player.strTeam}</li>
                <a href=${player.strFacebook}><i class="fa-brands fa-facebook"></i></a>
                <a href=${player.strInstagram}><i class="fa-brands fa-instagram"></i></a><br>
                <button id= "add-button${player.idPlayer}" class="btn bg-info mt-1 p-1" onclick="addGroup('${player.strThumb}','${player.strPlayer}','${player.idPlayer}')"><span>Add to group</span></button><br>
                <button class="btn bg-primary mt-1 p-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="playerDetails(${player.idPlayer})">Details</button>
            `
            player_container.appendChild(div);
            console.log(player.strFacebook);

        })
    })
}


default_display();


let count=0;

const addGroup=(img, name, id)=>{
    const status= document.getElementById(`add-button${id}`).innerHTML;
    if(status=="Added")
        {
            alert("Already added");
        }
    else if(count>10)
        {
            alert("You can\'t add more than 11")
        }
    else
    {
        count++;
        const addPlayerCart= document.getElementById("add-player-cart");
        const div= document.createElement("div");
        div.classList.add("cart")
        div.innerHTML=`
        <img src=${img} width="200px" height="200px">
        <h6>Name: ${name}</h6>
        `
        addPlayerCart.appendChild(div);
        document.getElementById("count").innerText= count;
        document.getElementById(`add-button${id}`).innerHTML="Added";
        document.getElementById(`add-button${id}`).style.color="red";
        console.log(status);
    }
}

// player details:

const playerDetails=(id)=>{
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then(res=>res.json())
    .then(player=>{
        document.getElementById("staticBackdropLabel").innerHTML=player.players[0].strPlayer
        document.getElementById("modal-body").innerHTML=player.players[0].strDescriptionEN
        

    })
}