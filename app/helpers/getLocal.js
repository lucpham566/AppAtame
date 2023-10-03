import local from '../commons/local.json';

export const getProvince = id => {
  const province = local.filter(sitem => sitem.id == id);
  return province[0] ? province[0] : {};
};

export const getDistrict = (id, province) => {
  if (province) {
    const {districts} = province;
    const district = districts?.filter(sitem => sitem.id == id);
    return district ? district[0] : {};
  } else {
    return {};
  }
};
