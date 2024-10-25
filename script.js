document.getElementById('uploadButton').addEventListener('click', function() {
    const input = document.getElementById('imageInput');
    const file = input.files[0];

    if (!file) {
        alert('Silakan pilih gambar terlebih dahulu.');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    // Ganti 'YOUR_API_KEY' dengan API Key Anda dari imgbb
    const apiKey = '53bbcf99a19845ff01718b47815971aa';
    const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const imageUrl = data.data.url;
            document.getElementById('result').innerHTML = `
                <p>Image URL:</p>
                <input type="text" value="${imageUrl}" readonly>
                <a href="${imageUrl}" target="_blank">Lihat Gambar</a>
            `;
        } else {
            alert('Gagal mengupload gambar: ' + data.error.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengupload gambar.');
    });
});