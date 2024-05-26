document.addEventListener('DOMContentLoaded', function() {
    fetchData();

    document.getElementById('create-client-form').addEventListener('submit', function(event) {
        event.preventDefault();
        createClient();
    });
});

function fetchData() {
    fetch('actions.php?action=read') 
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('content');
            content.innerHTML = '';
            let table = '<table><tr><th>ID</th><th>Nombre</th><th>Dirección</th><th>Teléfono</th><th>Email</th><th>Acciones</th></tr>';
            data.forEach(client => {
                table += `<tr>
                    <td>${client.cliente_id}</td>
                    <td>${client.nombre}</td>
                    <td>${client.direccion}</td>
                    <td>${client.telefono}</td>
                    <td>${client.email}</td>
                    <td><button onclick="deleteClient(${client.cliente_id})">Eliminar</button></td>
                </tr>`;
            });
            table += '</table>';
            content.innerHTML = table;
        });
}

function createClient() {
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;

    fetch('actions.php?action=create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nombre, direccion, telefono, email})
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              fetchData();
          } else {
              alert('Error al crear cliente');
          }
      });
}

function deleteClient(cliente_id) {
    fetch(`actions.php?action=delete&cliente_id=${cliente_id}`, {
        method: 'GET'
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              fetchData();
          } else {
              alert('Error al eliminar cliente');
          }
      });
}
