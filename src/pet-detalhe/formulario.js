document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('adoption-form');
    let formSubmitted = false; 

    form.addEventListener('submit', function() {
        formSubmitted = true;
                // Impede o envio padrão do formulário
        event.preventDefault();

        // 1. SIMULAÇÃO: Mostrar que os dados foram capturados
        console.log('Formulário enviado! (Simulação)');
        const formData = new FormData(form);
        for (let [name, value] of formData.entries()) {
            console.log(`${name}: ${value}`);
        }
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Google Forms requer isso
        })
        .then(() => {
                window.location.href = 'obrigado.html'; 
            // form.reset(); // Limpa o formulário
        })
        .catch(error => console.error('Erro:', error));
        // Pega o iframe
        // const iframe = document.getElementById('hidden_iframe');
        // if(iframe) {
        //     iframe.dataset.submitted = "true";
        // }
    });

    // const iframe = document.getElementById('hidden_iframe');
    // if (iframe) {
    //     iframe.addEventListener('load', function() {
    //         // Verifica se o 'load' foi por causa do nosso 'submit'
    //         if (iframe.dataset.submitted === "true") {
                
    //             // Sucesso! Mostra o alerta e redireciona
    //             alert('Formulário enviado para análise! Muito obrigado!');
                
    //             // *** ESTA É A LINHA ATUALIZADA ***
                
    //             iframe.dataset.submitted = "false";
    //         }
    //     });
    // }
});

// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('adoption-form');

//     form.addEventListener('submit', function(event) {
//         // Impede o envio padrão do formulário
//         event.preventDefault();

//         // 1. SIMULAÇÃO: Mostrar que os dados foram capturados
//         console.log('Formulário enviado! (Simulação)');
//         const formData = new FormData(form);
//         for (let [name, value] of formData.entries()) {
//             console.log(`${name}: ${value}`);
//         }
        
//         fetch(form.action, {
//             method: 'POST',
//             body: formData,
//             mode: 'no-cors' // Google Forms requer isso
//         })
//         .then(() => {
//             alert('Formulário enviado para análise!');
//             // form.reset(); // Limpa o formulário
//         })
//         .catch(error => console.error('Erro:', error));
//     });
// });