import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import "react-contexify/dist/ReactContexify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';


const ContextMenu = ({MENU_ID, menuData, onViewMovieSelect, onEditMovieSelect, onDeleteMovieSelect}) => {
    const { show } = useContextMenu({
        id: MENU_ID
      });

      const handleContextMenu = (event) => {
        show({
            event,
            props: {
                key: 'value'
            }
        })
    }
  
    const handleItemClick = ({ id, event, props }) => {
      switch (id) {
        case "view":
            onViewMovieSelect(menuData)
            console.log(event, props,1);
            break;
        case "edit":
            onEditMovieSelect(menuData)
            console.log(event, props,2);
            break;
        case "delete":
            onDeleteMovieSelect(menuData)
            console.log(event, props,3);
            break;
        default:
            console.log(event, props);
      }
    };

    return (
        <div>
            <button data-testid="context-menu-button" onClick={(e)=>{
                 e.stopPropagation();
                 handleContextMenu(e)
            }} className="btn btn-link btn-more">
                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </button>
            <Menu id={MENU_ID}>
            <Item data-testid="view" id="view" onClick={handleItemClick}>View</Item>
            <Item data-testid="edit" id="edit" onClick={handleItemClick}>Edit</Item>
            <Item data-testid="delete" id="delete" onClick={handleItemClick}>Delete</Item>
            <Separator />
            <Item disabled>Disabled</Item>
            <Separator />
            <Submenu label="More">
                <Item id="reload" onClick={handleItemClick}>Reload</Item>
                <Item id="something" onClick={handleItemClick}>Do something else</Item>
            </Submenu>
            </Menu>
        </div>
    );
}


ContextMenu.propTypes = {
    MENU_ID: PropTypes.number,
    menuData: PropTypes.any,
    onViewMovieSelect: PropTypes.func,
    onEditMovieSelect: PropTypes.func,
    onDeleteMovieSelect: PropTypes.func,
    onTileSelected: PropTypes.func,
};

ContextMenu.defaultProps = {
    MENU_ID: 1,
    menuData: {
        id: 1,
        imageUrl: "https://netflix-roulette.com"
    },
    onViewMovieSelect: () => {},
    onEditMovieSelect: () => {},
    onDeleteMovieSelect: () => {},
    onTileSelected: () => {},
};

export default ContextMenu;
