import React , {useEffect, useState, useCallback}from 'react'
import DashBoardLayout from '../../components/layout/DashBoardLayout'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import ExpenseList from '../../components/Expense/ExpenseList'
import Toast from '../../components/Toast'
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import Modal from '../../components/Modal'
import AddExpenseForm from '../../components/Expense/AddExpenseForm';

const Expense = () => {
  const [expenseData,setExpenseData]=useState([]);
  const[loading,setLoading]=useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });
  
  //Get All Expense Details
  const fetchExpenseDetails = useCallback(async () => {
    if(loading) return

    setLoading(true);

    try{
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
      setExpenseData(response.data);

     if(response.data){
      setExpenseData(response.data);
     }
    }catch(error){
      console.error("Failed to fetch expense data:",error);
     }
      finally{
        setLoading(false);
      }

  }, [loading]);

  //HandleAdd Expense
  const handleAddExpense = async (expense) => {
    console.log('Expense added successfully:', expense);
    // Show success toast
    setToast({
      show: true,
      message: 'Expense successfully added!',
      type: 'success'
    });
    // Refresh the expense data
    fetchExpenseDetails();
    // Close the modal
    setOpenAddExpenseModal(false);
  };

  // Handle expense deletion
  const handleExpenseDeleted = (deletedExpenseId) => {
    console.log('Expense deleted:', deletedExpenseId);
    // Show success toast
    setToast({
      show: true,
      message: 'Expense successfully deleted!',
      type: 'success'
    });
    // Refresh the expense data
    fetchExpenseDetails();
  };

  // Handle toast close
  const handleToastClose = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  useEffect(() => {
    fetchExpenseDetails()
  }, [fetchExpenseDetails]);
  


  
  return (
    <DashBoardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverview
            transactions={expenseData}
            onAddExpense={()=>setOpenAddExpenseModal(true)}
            />
          </div>
          
          <div className=''>
            <ExpenseList
              expenses={expenseData}
              onExpenseDeleted={handleExpenseDeleted}
            />
          </div>
        </div>
         
       <Modal 
       isOpen={openAddExpenseModal}
       onClose={()=>setOpenAddExpenseModal(false)}
       title="Add Expense"
       >
        <AddExpenseForm 
          onSuccess={handleAddExpense}
          onCancel={()=>setOpenAddExpenseModal(false)}
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

export default Expense