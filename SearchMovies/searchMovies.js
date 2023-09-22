document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#searchForm');
    form.addEventListener('submit', async function (e) {
        try {
            e.preventDefault();
            const searchValue = form.elements.query.value;
            const  config = {
                params: {query: searchValue}
            }
            const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${config}`);
            const data = res.data;
            clearImages(); // Clear existing images
            addImages(data);
            form.elements.query.value = '';
        } catch (e) {
            console.log("err", e);
        }
    });

    // Add an event listener for the input change
    form.elements.query.addEventListener('input', () => {
        clearImages(); // Clear existing images when input changes
    });

    const addImages = (shows) => {
        for (let result of shows) {
            if (result.show.image) {
                const img = document.createElement('img');
                img.src = result.show.image.medium;
                document.body.append(img);
            }
        }
    };

    const clearImages = () => {
        const existingImages = document.querySelectorAll('img');
        existingImages.forEach((img) => {
            img.remove();
        });
    };
});
