// ** ThemeConfig Import
import themeConfig from '@configs/themeConfig'
import { Dashboard } from '../../../../src/view/dashboard/Dashboard'
// ** Returns Initial Menu Collapsed State
const initialMenuCollapsed = () => {
  const item = window.localStorage.getItem('menuCollapsed')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed
}

// ** Returns Initial Layout Skin
const initialLayoutSkin = () => {
  const item = window.localStorage.getItem('skin')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.skin
}
const initialMenuOption = () => {
  const item = window.localStorage.getItem('menuoption')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : "showonlyicon"
}
const initialSubmenuOption = () => {
  const item = window.localStorage.getItem('submenuoption')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : "subboth"
}
const initialHiddenOption = () => {
  const item = window.localStorage.getItem('isHidden')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : false
}
const initialBehaviorOption = () => {
  const item = window.localStorage.getItem('behavior')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : "behavioron"
}
const initialHovertextOption = () => {
  const item = window.localStorage.getItem('hovertext')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : "hoveron"
}
const initialMenuTab = () => {
  
  const item = window.localStorage.getItem('menutab')
  // var initailitems = [{id: 1, name : "Dashboard", img :"", column:"FirstTab"}]
  // const item = initailitems
  
  // var initailitems = [ {id: 1, name : "Dashboard", img :"", column:"FirstTab"},
  // {id: 2, name : "Portfolio", img :"", column:"FirstTab"},
  // {id: 3, name : "BlogList", img :"", column:"FirstTab"}]
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : []
}

const initialPaneTab = () => {
  const item = window.localStorage.getItem('panetab')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : "panetaboff"
}
const initialRightclick = () => {
  const item = window.localStorage.getItem('rightclick')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : "rightclickoff"
}


// ** Initial State
const initialState = {
  skin: initialLayoutSkin(),
  isRTL: themeConfig.layout.isRTL,
  menuCollapsed: initialMenuCollapsed(),
  menuHidden: initialHiddenOption(),
  contentWidth: themeConfig.layout.contentWidth,
  component : "dashboard",
  menulist : initialMenuOption(),
  submenulist : initialSubmenuOption(),
  isHidden : initialHiddenOption(),
  behavior : initialBehaviorOption(),
  hovertext :initialHovertextOption(),
  menutab : initialMenuTab(),
  panetab : initialPaneTab(),
  rightclick : initialRightclick()
}

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HANDLE_CONTENT_WIDTH':
      return { ...state, contentWidth: action.value }
    case 'HANDLE_MENU_COLLAPSED':
      window.localStorage.setItem('menuCollapsed', action.value)
      return { ...state, menuCollapsed: action.value }
    case 'HANDLE_MENU_HIDDEN':
      window.localStorage.setItem('isHidden', action.value)
      return { ...state, menuHidden: action.value }
    case 'HANDLE_RTL':
      return { ...state, isRTL: action.value }
    case 'HANDLE_SKIN':
   
      return { ...state, skin: action.value }
    case 'HANDLE_COMPONENT':
   
      return { ...state, component: action.value }
    case 'HANDLE_MENULIST':
   
      return { ...state, menulist: action.value }
    case 'HANDLE_SUBMENULIST':
   
      return { ...state, submenulist: action.value }

    case 'HANDLE_BEHAVIOR':
   
      return { ...state, behavior: action.value }

    case 'HANDLE_HOVERTEXT':
   
      return { ...state, hovertext: action.value }
    case 'HANDLE_MENUTAB':
      console.log(action.value)
      return { ...state, menutab: action.value }

    case 'HANDLE_PANETAB':
   
      return { ...state, panetab: action.value }

    case 'HANDLE_RIGHTCLICK':
      console.log("store")
      console.log(action.value)
      return { ...state, rightclick: action.value }
      
    default:
      return state
  }
}

export default layoutReducer
