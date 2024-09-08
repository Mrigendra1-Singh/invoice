// Example data (could be replaced by actual inputs)
const invoiceData = {
    sellerDetails: {
        name: "ABC Pvt Ltd",
        address: "123 Street, City",
        panNo: "ABCDE1234F",
        gstNo: "22ABCDE1234F1Z5"
    },
    billingDetails: {
        name: "Customer Name",
        address: "456 Billing Street, Billing City"
    },
    shippingDetails: {
        name: "Shipping Name",
        address: "789 Shipping Street, Shipping City"
    },
    orderDetails: {
        orderNo: "12345",
        orderDate: "01/09/2024",
        invoiceNo: "INV12345",
        invoiceDate: "02/09/2024",
        placeOfSupply: "State Name",
        reverseCharge: "No"
    },
    items: [
        {
            description: "Item 1",
            unitPrice: 100,
            quantity: 2,
            discount: 10,
            taxRate: 18
        },
        {
            description: "Item 2",
            unitPrice: 50,
            quantity: 5,
            discount: 0,
            taxRate: 18
        }
    ]
};

// Function to dynamically populate invoice
function populateInvoice(data) {
    document.getElementById('seller-name').innerText = data.sellerDetails.name;
    document.getElementById('seller-address').innerText = data.sellerDetails.address;
    document.getElementById('seller-pan').innerText = `PAN No: ${data.sellerDetails.panNo}`;
    document.getElementById('seller-gst').innerText = `GST No: ${data.sellerDetails.gstNo}`;

    document.getElementById('billing-name').innerText = `Name: ${data.billingDetails.name}`;
    document.getElementById('billing-address').innerText = `Address: ${data.billingDetails.address}`;
    
    document.getElementById('shipping-name').innerText = `Name: ${data.shippingDetails.name}`;
    document.getElementById('shipping-address').innerText = `Address: ${data.shippingDetails.address}`;

    document.getElementById('order-no').innerText = data.orderDetails.orderNo;
    document.getElementById('order-date').innerText = data.orderDetails.orderDate;
    document.getElementById('invoice-no').innerText = data.orderDetails.invoiceNo;
    document.getElementById('invoice-date').innerText = data.orderDetails.invoiceDate;
    document.getElementById('place-of-supply').innerText = data.orderDetails.placeOfSupply;
    document.getElementById('reverse-charge').innerText = data.orderDetails.reverseCharge;

    let totalAmount = 0;
    const itemList = document.getElementById('item-list');
    data.items.forEach(item => {
        const netAmount = item.unitPrice * item.quantity - item.discount;
        const taxAmount = netAmount * item.taxRate / 100;
        const totalItemAmount = netAmount + taxAmount;

        const row = `
            <tr>
                <td>${item.description}</td>
                <td>${item.unitPrice}</td>
                <td>${item.quantity}</td>
                <td>${item.discount}</td>
                <td>${netAmount.toFixed(2)}</td>
                <td>${taxAmount.toFixed(2)}</td>
            </tr>
        `;
        itemList.innerHTML += row;
        totalAmount += totalItemAmount;
    });
    document.getElementById('total-amount').innerText = totalAmount.toFixed(2);
    document.getElementById('seller-name-footer').innerText = data.sellerDetails.name;
}

// Call function to populate the invoice
populateInvoice(invoiceData);

// Function to generate PDF using html2pdf.js
function generatePDF() {
    const element = document.getElementById('invoice');
    html2pdf().from(element).save('invoice.pdf');
}
