const BASE_URL = "http://localhost/enseignant-app-spa/api/enseignants";


async function request(endpoint, method = "GET", body = null) {

    // consere the method and  into an object
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  }
  // convert the method into json if it needs to send data else skip
    if (body) {
    options.body = JSON.stringify(body);
  }
 
  const response = await fetch(`${BASE_URL}/${endpoint}`, options);
  const data = await response.json();
  return data;
}


export const EnseignantApi = 
{
    getAll : ()=>
        request("read.php"),

    create: (matricule, nom, taux_horaire, nombre_heures) => 
        request("create.php" , "POST" , {matricule, nom, taux_horaire, nombre_heures}),

    delete: (matricule) =>
        request("delete.php" , "POST" , {matricule}),

    update: (matricule, nom, taux_horaire, nombre_heures) =>
        request("update.php","POST",{matricule, nom, taux_horaire, nombre_heures}) ,

     getBilan: () =>
    request("enseignants/bilan.php"),
}