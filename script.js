// script.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pdfForm');
    const pdfFileInput = document.getElementById('pdfFileInput');
    const summarizeBtn = document.getElementById('summarizeBtn');
    const summaryContent = document.getElementById('summaryContent');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        const pdfFile = pdfFileInput.files[0];
        if (!pdfFile) {
            alert('Por favor, selecione um arquivo PDF.');
            return;
        }

        // Verifica o tamanho do arquivo (limite de 50MB)
        if (pdfFile.size > 50 * 1024 * 1024) {
            alert('O tamanho máximo permitido para o arquivo PDF é de 50MB.');
            return;
        }

        const formData = new FormData();
        formData.append('pdfFile', pdfFile);

        try {
            const response = await fetch('/summarize', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Falha ao resumir o PDF.');
            }

            const summary = await response.text();
            summaryContent.textContent = summary;
            summaryContent.style.display = 'block'; // Exibe a área de resumo
        } catch (error) {
            alert(`Erro: ${error.message}`);
        }
    });
});

