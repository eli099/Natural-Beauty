import { useEffect } from 'react'
import axios from 'axios'

const App = () => {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/products/') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  })

  return <h1>Natural Beauty</h1>
  // return (
  //   <main className='site-wrapper'>
  //     <BrowserRouter>
  //       <PageNavBar />
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/register" element={<Register />} />
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/parks" element={<Parks />} />
  //         <Route path="/parks/:id" element={<Park />} />
  //         <Route path="*" element={<Not_Found />} />
  //       </Routes>
  //     </BrowserRouter>
  //   </main>
  // )
}

export default App
