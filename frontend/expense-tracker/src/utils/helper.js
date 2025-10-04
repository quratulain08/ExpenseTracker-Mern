import moment from "moment";

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





export const prepareIncomeBarChartData = (data=[])=>{
  console.log('Income chart data input:', data);
  if (!data || data.length === 0) {
    console.log('No income data provided');
    return [];
  }
  
  const chartData = data.map((item)=>({
    category: item?.source || 'Unknown Source', // Use category to match CustomBarChart
    amount: item?.amount || 0,
    month: moment(item?.date).format("DD MMM") // Keep month for reference
  }));
  
  console.log('Income chart data output:', chartData);
  return chartData;
}

export const prepareExpenseBarChartData = (data=[])=>{
  console.log('Expense chart data input:', data);
  if (!data || data.length === 0) {
    console.log('No expense data provided');
    return [];
  }
  
  const chartData = data.map((item)=>({
    category: item?.category || 'Unknown Category',
    amount: item?.amount || 0,
    month: moment(item?.date).format("DD MMM")
  }));
  
  console.log('Expense chart data output:', chartData);
  return chartData;
}
