import Footer from "../../components/footer/Footer"
import { Header } from "../../components/header/Header"
import Notfound from "../../components/notfound/Notfound"

const Page404 = () => {
  return (
    <div>
        <Header></Header>
        <Notfound title={"Trang này không tồn tại!!"}></Notfound>
        <Footer></Footer>
    </div>
  )
}

export default Page404