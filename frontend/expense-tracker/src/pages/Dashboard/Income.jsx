import React , {useEffect, useState}from 'react'
import DashBoardLayout from '../../components/layout/DashBoardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import IncomeList from '../../components/Income/IncomeList'
import Toast from '../../components/Toast'
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import Modal from '../../components/Modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm';




const Income = () => {
  const [incomeData,setIncomeData]=useState([]);
  const[loading,setLoading]=useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });
  
  //Get All Income Details
  const fetchIncomeDetails = async () => {
    if(loading) return

    setLoading(true);

    try{
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
      setIncomeData(response.data);

     if(response.data){
      setIncomeData(response.data);
     }
    }catch(error){
      console.error("Failed to fetch income data:",error);
     }
      finally{
        setLoading(false);
      }

  };

  //HandleAdd Income
  const handleAddIncome = async (income) => {
    console.log('Income added successfully:', income);
    // Show success toast
    setToast({
      show: true,
      message: 'Income successfully added!',
      type: 'success'
    });
    // Refresh the income data
    fetchIncomeDetails();
    // Close the modal
    setOpenAddIncomeModal(false);
  };

  // Handle income deletion
  const handleIncomeDeleted = (deletedIncomeId) => {
    console.log('Income deleted:', deletedIncomeId);
    // Show success toast
    setToast({
      show: true,
      message: 'Income successfully deleted!',
      type: 'success'
    });
    // Refresh the income data
    fetchIncomeDetails();
  };

  // Handle toast close
  const handleToastClose = () => {
    setToast(prev => ({ ...prev, show: false }));
  };



  useEffect(() => {
    fetchIncomeDetails()
  }, []);
  


  
  return (
    <DashBoardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
            transactions={incomeData}
            onAddIncome={()=>setOpenAddIncomeModal(true)}
            />
          </div>
          
          <div className=''>
            <IncomeList
              incomes={incomeData}
              onIncomeDeleted={handleIncomeDeleted}
            />
          </div>
        </div>
         
       <Modal 
       isOpen={openAddIncomeModal}
       onClose={()=>setOpenAddIncomeModal(false)}
       title="Add Income"
       >
        <AddIncomeForm 
          onSuccess={handleAddIncome}
          onCancel={()=>setOpenAddIncomeModal(false)}
        />
       </Modal>

       {/* Toast Notification */}
       <Toast
         message={toast.message}
         type={toast.type}
         isVisible={toast.show}
         onClose={handleToastClose}
         duration={3000}
       />

        </div>
        </DashBoardLayout>
  )
}

export default Income