
const Index = () => {
  return (
    <div className='max-w-6xl mx-auto p-4 sm:p-6'>
      <h1 className='text-lg sm:text-2xl font-semibold mb-4'>Admin Dashboard</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-white p-4 rounded-lg shadow'>
            <h2 className='text-lg font-medium'>Total Orders</h2>
          <p className='text-3xl font-bold'>1,234</p>
          <p className='text-green-500'>+5% from last month</p>
        </div>
        <div className='bg-white p-4 rounded-lg shadow'>
          <h2 className='text-lg font-medium'>Total Revenue</h2>
          <p className='text-3xl font-bold'>$56,789</p>
          <p className='text-green-500'>+8% from last month</p> 
        </div>
        <div className='bg-white p-4 rounded-lg shadow'>
          <h2 className='text-lg font-medium'>Total Products</h2>
          <p className='text-3xl font-bold'>345</p>
          <p className='text-green-500'>+2% from last month</p>
        </div>
        <div className='bg-white p-4 rounded-lg shadow'>
          <h2 className='text-lg font-medium'>Total Customers</h2>
          <p className='text-3xl font-bold'>789</p>
          <p className='text-green-500'>+3% from last month</p>
        </div>
      </div>
    </div>
  )
}

export default Index