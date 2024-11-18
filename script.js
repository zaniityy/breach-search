document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    const query = document.getElementById('search-input').value.toLowerCase(); // Get the search query
    const resultsContainer = document.getElementById('results-container'); // Container for displaying results

    // Clear previous results and show a loading message
    resultsContainer.innerHTML = '<p>Loading results...</p>';

    // Variables to store results as they stream
    let foundResults = 0;

    Papa.parse('breach-data.csv', {
        download: true,
        header: true,
        step: function (row) {
            const data = row.data;

            // Check if the row matches the query
            if (
                data.discordid?.toLowerCase().includes(query) ||
                data.discordname?.toLowerCase().includes(query) ||
                data.ipaddress?.toLowerCase().includes(query) ||
                data.date?.toLowerCase().includes(query)
            ) {
                foundResults++;

                // Append each matching result immediately
                const result = `
                    <p>
                        <strong>No:</strong> ${data.no}<br>
                        <strong>Discord ID:</strong> ${data.discordid}<br>
                        <strong>Discord Name:</strong> ${data.discordname}<br>
                        <strong>IP Address:</strong> ${data.ipaddress}<br>
                        <strong>Date:</strong> ${data.date}
                    </p>
                    <hr>
                `;
                resultsContainer.innerHTML += result;
            }
        },
        complete: function () {
            if (foundResults === 0) {
                resultsContainer.innerHTML = '<p>No results found.</p>';
            }
        },
        error: function (error) {
            resultsContainer.innerHTML = `<p>Error loading breach data: ${error.message}</p>`;
        }
    });
});
