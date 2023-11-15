import { PageBanner } from "../../components/PageBanner"
import bannerImg from '../../assets/menu/banner3.jpg'
import { Offer } from "./Offer"
import { useMenuData } from "../../hooks/useMenuData"
import { Deserts } from "./Deserts"
import { Pizza } from "./Pizza"
import { Salads } from "./Salads"
import { Soups } from "./Soups"
import { PageTitle } from "../../components/PageTitle"

const MenuPage = () => {
  const { menu } = useMenuData()

  const deserts = menu.filter(item => item.category === 'dessert')
  const pizza = menu.filter(item => item.category === 'pizza')
  const salads = menu.filter(item => item.category === 'salad')
  const soups = menu.filter(item => item.category === 'soup')

  return (
    <div>
      <PageTitle title='Menu | Bistro Boss'/>
      <PageBanner title='OUR MENU' description='Would you like to try a dish?' bgImg={bannerImg}/>
      <Offer/>
      <Deserts items={deserts.slice(0, 6)}/>
      <Pizza items={pizza.slice(0, 6)}/>
      <Salads items={salads.slice(0, 6)}/>
      <Soups items={soups.slice(0, 6)}/>
    </div>
  )
}

export default MenuPage