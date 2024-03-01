document.getElementById('apiForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 獲取所有輸入值
    const pageLimit = document.getElementById('pageLimit').value;
    const network = document.getElementById('network').value;
    const collection = document.getElementById('collection').value;
    const chainId = document.getElementById('chainId').value;
    const page = document.getElementById('page').value;
    const minPrice = parseFloat(document.getElementById('minPrice').value);
    const maxPrice = parseFloat(document.getElementById('maxPrice').value);

    fetch('/api/call', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pageLimit, network, collection, chainId, page }),
    })
    .then(response => response.json())
    .then(data => {
        const items = data.items || [];
        const resultContainer = document.querySelector('#apiResult pre');
        resultContainer.innerHTML = '';

        let validOrderCount = 0;
        let totalAmount = 0;

        // 建立表格
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Offerer</th>
                <th>Price</th>
                <th>Hash</th>
                <th>End Time</th>
            </tr>
        `;

        items.forEach(item => {
            const listing = item.order?.listing || {};
            const price = parseFloat(listing.price || 0);
            if (price >= minPrice && price <= maxPrice) {
                validOrderCount++;
                totalAmount += price;
            }

            const offererFormatted = listing.offerer ? formatString(listing.offerer) : '';
            const hashFormatted = listing.hash ? formatString(listing.hash) : '';
            
            // 向表格中添加行
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${offererFormatted}</td>
                <td>${price.toFixed(2)}</td>
                <td>${hashFormatted}</td>
                <td>${listing.endTime || ''}</td>
            `;
            table.appendChild(row);
        });

        // 將結果摘要和表格加入到結果容器
        resultContainer.innerHTML = `符合條件的訂單數量: ${validOrderCount}<br>符合條件的訂單金額總和: ${totalAmount.toFixed(2)}<br><br>`;
        resultContainer.appendChild(table);
    })
    .catch(error => console.error('Error:', error));
});

function formatString(str) {
    return str.length > 10 ? `${str.substring(0, 5)}...${str.substring(str.length - 5)}` : str;
}
