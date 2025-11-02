document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('adoption-form');
    let formSubmitted = false; 

    form.addEventListener('submit', function() {
        formSubmitted = true;
        
        // Pega o iframe
        const iframe = document.getElementById('hidden_iframe');
        if(iframe) {
            iframe.dataset.submitted = "true";
        }
    });

    const iframe = document.getElementById('hidden_iframe');
    if (iframe) {
        iframe.addEventListener('load', function() {
            // Verifica se o 'load' foi por causa do nosso 'submit'
            if (iframe.dataset.submitted === "true") {
                
                // Sucesso! Mostra o alerta e redireciona
                alert('Formulário enviado para análise! Muito obrigado!');
                
                // *** ESTA É A LINHA ATUALIZADA ***
                window.location.href = 'obrigado.html'; 
                
                iframe.dataset.submitted = "false";
            }
        });
    }
});