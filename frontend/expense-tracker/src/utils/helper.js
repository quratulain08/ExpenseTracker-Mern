export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export const getInitials = (name) => {  
  if(!name) return "";

  const words = name.split(" ");
  let initials = "";

  for(let i = 0; i < Math.min(2, words.length); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addThousandSeperator = (num) => {
  if (num === null || num === undefined) return "0";

  const [integerPart , fractionalPart]=num.toString().split(".");
const formattedInteger=integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");

return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;}



export const prepareExpenseBarChartData = (data=[])=>{
  console.log('Chart data input:', data);
  const chartData = data.map((item)=>({
    category: item?.category || 'Unknown',
    amount: item?.amount || 0,
    month: item?.category 
  }));
  console.log('Chart data output:', chartData);
  return chartData;
};