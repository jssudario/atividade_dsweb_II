async function carregar() {
    const resp = await fetch('/usuario');
    const dados = await resp.json();
    
    let html = `
        <div class="table-container">
            <table class="table table-hover text-center align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>E-mail</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    dados.forEach(p => {
        html += `
            <tr>
                <td>${p.idpessoa}</td>
                <td>${p.nome}</td>
                <td>${p.telefone}</td>
                <td>${p.email || ''}</td>
                <td>
                    <button class="btn btn-sm btn-outline-secondary me-2" onclick="editar(${p.idpessoa})" title="Editar">
                        <i class="bi bi-pencil-fill"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="excluir(${p.idpessoa})" title="Excluir">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table></div>';
    document.getElementById('conteudo').innerHTML = html;
}

function novo() {
    document.getElementById('txtid').value = '';
    document.getElementById('txtnome').value = '';
    document.getElementById('txttelefone').value = '';
    document.getElementById('txtemail').value = '';
    document.getElementById('formulario').style.display = 'block';
}

async function salvar() {
    const id = document.getElementById('txtid').value;
    const nome = document.getElementById('txtnome').value;
    const telefone = document.getElementById('txttelefone').value;
    const email = document.getElementById('txtemail').value;

    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `/usuario/${id}` : '/usuario';

    await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, telefone, email })
    });

    cancelar();
    carregar(); 
}

function cancelar() {
    document.getElementById('formulario').style.display = 'none';
}

async function editar(id) {
    const resp = await fetch(`/usuario/${id}`);
    const pessoa = await resp.json();
    
    document.getElementById('txtid').value = pessoa.idpessoa;
    document.getElementById('txtnome').value = pessoa.nome;
    document.getElementById('txttelefone').value = pessoa.telefone;
    document.getElementById('txtemail').value = pessoa.email || '';
    
    document.getElementById('formulario').style.display = 'block';
}

async function excluir(id) {
    if(confirm('Deseja excluir o cadastro?')) {
        await fetch(`/usuario/${id}`, { method: 'DELETE' });
        carregar(); 
    }
}

carregar();