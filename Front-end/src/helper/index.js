const currency ={
    formatCurrency(price)
        {
            var formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            //minimumFractionDigits: 0, // 
            //maximumFractionDigits: 0, // 
            });
            return formatter.format(price); /* $2,500.00 */
        }
}
export default currency