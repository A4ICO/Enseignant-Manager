const BASE_URL = 'http://localhost/enseignant-app-spa/api/enseignants/';
const URLTest = 'http://localhost/enseignant-app-spa/api/enseignants/create.php';

async function request(endpoint = '', method = "GET", body = null) {

    // consere the method and  into an object
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  }
  // convert the method into json if it needs to send data else skip
    if (body) {
    options.body = JSON.stringify(body);
  }
 
try
    {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        if(!response.ok)
        {
            throw new Error(`Error HTTP : ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
catch(error)
        {
            console.error("Erreur lors de la requête :", error.message);
        }
}



async function fetchData() {
 try {
   const response = await fetch(URLTest);
   if (!response.ok) {
     throw new Error('Network response was not ok');
   }
   const data = await response.json();
   console.log(data);
 } catch (error) {
   console.error('Error:', error);
 }
}

export const fetchTest= {
    test : () => fetchData(),
};

export const EnseignantApi = 
{
    getAll : () =>
        request(),

    create: (matricule, nom, taux_horaire, nombre_heures) => 
        request("", "POST" , {matricule, nom, taux_horaire, nombre_heures}),

    delete: (matricule) =>
        request(`${matricule}` , "DELETE"),

    update: (matricule, nom, taux_horaire, nombre_heures) =>
        request( `${matricule}`,"PUT",{nom, taux_horaire, nombre_heures}) ,

     getBilan: () =>
        request(),
}