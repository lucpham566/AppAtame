import { ListItem, Text } from 'native-base';
import { urlServer } from '../commons/server';

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

export const genTextFromRuleAutomated = (rule, dimension, dimension_id) => {
  let text = "";

  const apply_objects = rule.apply_objects;
  const conditions = rule.conditions;

  if (!rule && apply_objects && conditions) {
    return text;
  }
  conditions?.map(condition => {
    const { subject_type, range_type, match_type, values, calculation_type } = condition;
    text += genTextSubjectType(subject_type) + " " + genTextMatchType(match_type) + " " + genTextValue(match_type, values) + " ";
  })

  console.log(dimension, dimension_id, "asdhdksajsdka dimension");

  text = genTextDimension(dimension) + " " + dimension_id + " " + text;

  return text;
};

const genTextMatchType = (match_type) => {
  let text = "";
  switch (match_type) {
    case "GT":
      text = "trên"
      break;
    case "LT":
      text = "dưới"
      break;
    case "BETWEEN":
      text = "vào ngưỡng"
      break;
  }

  return text;
}

const genTextValue = (match_type, values) => {
  let text = "";
  switch (match_type) {
    case "GT":
      text = Number(values[0])
      break;
    case "LT":
      text = Number(values[0])
      break;
    case "BETWEEN":
      text = Number(values[0]) + " đến " + Number(values[1]);
      break;
  }

  return text;
}

const genTextSubjectType = (subject_type) => {

  const data_text = [
    { key: "spend", value: "chi phí" }
  ]
  const subject = data_text.find(i => i.key === subject_type)
  if (subject) {
    return subject.value;
  }

  return subject_type;
}

const genTextDimension = (dimension) => {

  let text = "";
  switch (dimension) {
    case "CAMPAIGN":
      text = "Chiến dịch";
      break;
    case "ADGROUP":
      text = "Nhóm quảng cáo";
      break;
    case "AD":
      text = "Quảng cáo";
      break;
  }

  return text;
}