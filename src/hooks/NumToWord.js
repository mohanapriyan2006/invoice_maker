export function convertNumberToWords(num) {
    const a = [
        '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six',
        'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
        'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
        'Seventeen', 'Eighteen', 'Nineteen'
    ];

    const b = [
        '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty',
        'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];

    if ((num = num.toString()).length > 9) return 'Overflow';

    const n = ('000000000' + num).slice(-9);

    const crore = parseInt(n.substr(0, 2));
    const lakh = parseInt(n.substr(2, 2));
    const thousand = parseInt(n.substr(4, 2));
    const hundred = parseInt(n.substr(6, 1));
    const rest = parseInt(n.substr(7, 2));

    let str = '';

    if (crore) {
        str += (a[crore] || b[Math.floor(crore / 10)] + ' ' + a[crore % 10]) + ' Crore ';
    }
    if (lakh) {
        str += (a[lakh] || b[Math.floor(lakh / 10)] + ' ' + a[lakh % 10]) + ' Lakh ';
    }
    if (thousand) {
        str += (a[thousand] || b[Math.floor(thousand / 10)] + ' ' + a[thousand % 10]) + ' Thousand ';
    }
    if (hundred) {
        str += a[hundred] + ' Hundred ';
    }
    if (rest) {
        str += (str !== '' ? 'and ' : '') +
            (a[rest] || b[Math.floor(rest / 10)] + ' ' + a[rest % 10]) + ' ';
    }

    return 'Indian Rupees ' + str.trim() + ' Only';
}
