import {ListItem, Text} from 'native-base';
import {urlServer} from '../commons/server';

let accountAvatar =
  'https://cdn.landesa.org/wp-content/uploads/default-user-image.png';

export const noneAvatar =
  'https://cdn.landesa.org/wp-content/uploads/default-user-image.png';

export let setAvatar = data => {
  accountAvatar = urlServer + data;
};
export let getAvatar = () => {
  return accountAvatar;
};

export let getUserCate = cate_id => {
  switch (Number(cate_id)) {
    case 1:
      return 'Chưa đi du học';
    case 2:
      return 'Đang đi du học';
    case 3:
      return 'Đã đi du học';
    default:
      return 'Chưa có thông tin';
  }
};

export let getParentCateCourse = (product_cates, parent = 0, path) => {
  let elm = product_cates.map((item, index) => {
    if (item.parent_id == parent) {
      return (
        <ListItem>
          <Text>{item.name}</Text>
        </ListItem>
      );
    }
  });
  return elm;
};

export const filterProductHelper = (data, nameSearch) => {
  return data?.filter(i => {
    const name = i.product?.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const nameCompare = nameSearch
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const campaignid = i.campaign?.campaignid;

    return (
      name.includes(nameCompare) || String(campaignid).includes(nameCompare)
    );
  });
};
