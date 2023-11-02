import { Button, Form, Item, Input, Label, Picker, Radio, ListItem, Right } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from '../../../helpers/formatNumber';
import { COLOR } from '../../../theme';
import { useForm, Controller } from 'react-hook-form';
import { updateAdsQuota } from '../../../features/BaoCaoHieuQuaScreen/actions';
import { hideModalConfigNotify } from '../../../features/MainScreen/actions';
import { createAutomatedRule, updateAutomatedRule } from '../../../apis/tongQuan';
import Icon from 'react-native-vector-icons/FontAwesome';
import ConfigConditionItem from './ConfigConditionItem';
import { hideLoadingGlobal, showLoadingGlobal } from '../../../features/globalFeatures/actions';

function ModalConfigNotify(props) {
  const show = useSelector(store => store.account.showModalConfigNotify);
  const [conditionList, setConditionList] = useState([{
    "subject_type": "spend",
    "range_type": 'TODAY',
    "calculation_type": "OF_EACH_OBJECT",
    "match_type": "GT",
    "values": ["0"]
  }]);
  const [applyObject, setApplyObject] = useState({
    pre_condition_type: "ALL_ACTIVE_CAMPAIGN"
  });

  const [ruleName, setRuleName] = useState("Quy tắc mới");
  const [ruleExecInfo, setRuleExecInfo] = useState({
    exec_time: "",
    exec_time_type: "PER_HALF_HOUR",
    time_period_info: []
  });

  const currentShop = useSelector(store => store.account.currentShop);
  const currentAdsAccount = useSelector(store => store.account.currentAdsAccount);

  const ConfigNotifyId = useSelector(store => store.account.ConfigNotifyId);
  const ConfigNotifyData = useSelector(store => store.account.ConfigNotifyData);
  const ConfigNotifyApplyObject = useSelector(store => store.account.ConfigNotifyApplyObject);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      total_quota: '',
      daily_quota: '',
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (ConfigNotifyId && ConfigNotifyData) {
      const { name, apply_objects, conditions, rule_exec_info } = ConfigNotifyData;

      setRuleName(name);
      setApplyObject(apply_objects[0]);
      setConditionList(conditions);
      setRuleExecInfo(rule_exec_info);

      console.log(name, apply_objects, conditions, "dsafjhdsakl");
    }

    if (ConfigNotifyApplyObject) {
      setApplyObject(ConfigNotifyApplyObject);
    }
  }, [ConfigNotifyId, ConfigNotifyData, ConfigNotifyApplyObject])


  const toggleModal = () => {
    reset();
    onReset();
    dispatch(hideModalConfigNotify());
  };

  const handleError = (field, errors) => {
    return (
      <>
        {errors[field] &&
          errors[field].type !== 'pattern' &&
          (errors[field]?.type === 'min' ? (
            <Text
              style={{
                paddingHorizontal: 3,
                paddingVertical: 2,
                color: COLOR.danger,
              }}>
              giá trị tối thiểu{' '}
              {errors[field].ref.name === 'total_quota' ? '100.000' : '5.000'}đ
            </Text>
          ) : (
            <Text
              style={{
                paddingHorizontal: 3,
                paddingVertical: 2,
                color: COLOR.danger,
              }}>
              {errors[field]?.message}
            </Text>
          ))}
        {errors[field]?.type === 'pattern' && (
          <Text
            style={{
              paddingHorizontal: 3,
              paddingVertical: 2,
              color: COLOR.danger,
            }}>
            Không đúng định dạng
          </Text>
        )}
      </>
    );
  };

  const onSubmitData = async () => {
    dispatch(showLoadingGlobal());

    try {
      let response = null;

      if (ConfigNotifyId && ConfigNotifyData) {
        //update
        const data = {
          advertiser_id: currentAdsAccount.advertiser_id,
          rule: {
            "name": ruleName,
            "notification": {
              "notification_type": "FIREBASE_NOTIFY",
              "email_setting": {
                "notification_period": "EVERY_TIME",
                "email_exec_time": [],
                "no_result_notification": false,
                "mute_option": "UNMUTE"
              }
            },
            "rule_exec_info": ruleExecInfo,
            "apply_objects": [
              {
                "dimension": "CAMPAIGN",
                "dimension_ids": [
                  "1779911139427329"
                ],
                "pre_condition_type": applyObject.pre_condition_type
              }
            ],
            "actions": [
              {
                "subject_type": "MESSAGE",
                "action_type": "ADJUST_TO",
                "value_type": "EXACT",
                "time_end": "",
                "value": {
                  "use_limit": false,
                  "value": 0,
                  "limit": 0
                },
                "frequency_info": {
                  "type": "ONLY_ONCE",
                  "custom_frequency_type": "N_MINTUE_Y_TIMES",
                  "time": 0,
                  "count": 0
                }
              }
            ],
            "conditions": conditionList
          },
          rule_id: ConfigNotifyId
        }
        response = await updateAutomatedRule(data, currentShop.id);

      } else {
        //create
        const data = {
          advertiser_id: currentAdsAccount.advertiser_id,
          rules: [
            {
              "name": ruleName,
              "notification": {
                "notification_type": "FIREBASE_NOTIFY",
                "email_setting": {
                  "notification_period": "EVERY_TIME",
                  "email_exec_time": [],
                  "no_result_notification": false,
                  "mute_option": "UNMUTE"
                }
              },
              "rule_exec_info": ruleExecInfo,
              "apply_objects": [
                {
                  "dimension": "CAMPAIGN",
                  "dimension_ids": [
                    "1779911139427329"
                  ],
                  "pre_condition_type": applyObject.pre_condition_type
                }
              ],
              "actions": [
                {
                  "subject_type": "MESSAGE",
                  "action_type": "ADJUST_TO",
                  "value_type": "EXACT",
                  "time_end": "",
                  "value": {
                    "use_limit": false,
                    "value": 0,
                    "limit": 0
                  },
                  "frequency_info": {
                    "type": "ONLY_ONCE",
                    "custom_frequency_type": "N_MINTUE_Y_TIMES",
                    "time": 0,
                    "count": 0
                  }
                }
              ],
              "conditions": conditionList
            }
          ]
        }
        response = await createAutomatedRule(data, currentShop.id);
      }

      if (response.data && response.data.code == 0) {
        Toast.show({
          type: 'success',
          text1: 'Thành công',
        });
      }
      else {
        console.log("vào show dasadds");

        Toast.show({
          type: 'error',
          text1: 'Thất bại error_id ' + response.data?.error_id,
          text2: response?.data?.message,
        });
      }
      console.log(response.data, "response. đâfdsasafd");
      toggleModal();

    } catch (error) {
      console.log(error?.response?.data, "error. #1209");
      console.log(error, "error. #1209");

      Toast.show({
        type: 'error',
        text1: 'Tạo thất bại' + error?.response?.error_id,
      });
    }

    dispatch(hideLoadingGlobal());

  };

  const baseDataConditon = {
    "subject_type": "spend",
    "range_type": 'TODAY',
    "calculation_type": "OF_EACH_OBJECT",
    "match_type": "GT",
    "values": ["0"]
  }

  const addCondition = () => {

    const newList = [...conditionList];
    newList.push(baseDataConditon);
    setConditionList(newList);
  }

  const setCondition = (index, data) => {

    const newList = [...conditionList];
    newList[index] = data;

    setConditionList(newList);
  }

  const data_subject_type = [
    {
      title: "Chi phí",
      value: "spend",
    }, {
      title: "CPC",
      value: "cpc",
    }, {
      title: "Click",
      value: "clicks",
    }, {
      title: "Lượt hiển thị",
      value: "impressions",
    }, {
      title: "CTR",
      value: "ctr",
    }, {
      title: "Lượt chuyển đổi",
      value: "conversion",
    }, {
      title: "Tỷ lệ chuyển đổi",
      value: "conversion_rate",
    },
  ]

  const data_apply_objects = [
    {
      title: "Chọn đối tượng",
      value: "SELECTED",
      selected: true
    },
    {
      title: "Tất cả chiến dịch đang hoạt động",
      value: "ALL_ACTIVE_CAMPAIGN",
      selected: false
    }, {
      title: "Tất cả nhóm quảng cáo đang hoạt động",
      value: "ALL_ACTIVE_AD_GROUP",
      selected: false
    }, {
      title: "Tất cả quảng cáo đang hoạt động",
      value: "ALL_ACTIVE_AD",
      selected: false
    },
    {
      title: "Tất cả chiến dịch đang không hoạt động",
      value: "ALL_INACTIVE_CAMPAIGN",
      selected: false
    }, {
      title: "Tất cả nhóm quảng cáo đang không hoạt động",
      value: "ALL_INACTIVE_AD_GROUP",
      selected: false
    }, {
      title: "Tất cả quảng cáo đang không hoạt động",
      value: "ALL_INACTIVE_AD",
      selected: false
    }
  ]

  const renderPickerSubjectType = () => {
    return data_subject_type.map((i, index) => {
      return (<Picker.Item
        key={index}
        style={{ fontSize: 13 }}
        label={i.title}
        value={i.value}
      />)
    })
  }

  const renderApplyObject = () => {
    if (ConfigNotifyApplyObject) {
      return data_apply_objects.map((i, index) => {
        return (<Picker.Item
          key={index}
          style={{ fontSize: 13 }}
          label={i.title}
          value={i.value}
        />)
      })
    }
    else {
      return data_apply_objects.filter(i => !i.selected).map((i, index) => {
        return (<Picker.Item
          key={index}
          style={{ fontSize: 13 }}
          label={i.title}
          value={i.value}
        />)
      })
    }

  }

  const renderConditionList = () => {
    return conditionList.map((i, index) => {
      return (<ConfigConditionItem setCondition={setCondition} item={i} key={index} index={index} />)
    })
  }

  const OnSetApplyObject = (value) => {
    setApplyObject({
      pre_condition_type: value
    });
  }

  const onReset = () => {
    setConditionList([
      {
        "subject_type": "spend",
        "range_type": 'TODAY',
        "calculation_type": "OF_EACH_OBJECT",
        "match_type": "GT",
        "values": ["0"]
      }
    ])

    setRuleName("Quy tắc mới");

    setRuleExecInfo({
      exec_time: "",
      exec_time_type: "PER_HALF_HOUR",
      time_period_info: []
    })
  }

  const renderListIdDimension = () => {
    const { dimension_ids, dimension } = ConfigNotifyApplyObject;
    return dimension_ids.map((item, index) => {
      return (
        <Text key={index} style={{
          borderColor: COLOR.primaryDark, borderWidth: 1,
          padding: 0, borderRadius: 5,
          backgroundColor: COLOR.primaryLight,
          color: COLOR.white,
          marginTop: 3,
          paddingHorizontal: 10,
          paddingVertical: 5
        }}> {dimension} - {item}</Text>
      )
    })
  }

  const renderConfigTime = () => {
    const data_config = [
      {
        title: "Chạy 15 phút 1 lần",
        value: {
          exec_time: "",
          exec_time_type: "QUARTER_HOUR",
          time_period_info: []
        }
      },
      {
        title: "Chạy 30 phút 1 lần",
        value: {
          exec_time: "",
          exec_time_type: "PER_HALF_HOUR",
          time_period_info: []
        }
      },
      {
        title: "Hàng ngày",
        value: {
          exec_time: "01:00",
          exec_time_type: "CUSTOM",
          time_period_info: []
        }
      },
    ]

    return data_config.map((item, index) => {
      return (
        <TouchableOpacity onPress={() => setRuleExecInfo(item.value)}
          style={{ flexDirection: 'row', marginVertical: 5 }} key={index}>
          <Text style={{ marginRight: 10, color: COLOR.grey, fontSize: 14, fontWeight: 'bold' }}>{item.title}</Text>
          <Radio
            selected={ruleExecInfo.exec_time_type == item.value.exec_time_type}
          />
        </TouchableOpacity>
      )
    })
  }

  return (
    <Modal isVisible={show}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {ConfigNotifyId ? "Sửa quy tắc" : "Thêm quy tắc"}
        </Text>
        <Form style={{ width: '100%', marginVertical: 10, flex: 1 }}>
          <ScrollView>
            <Text style={{ marginVertical: 5, color: COLOR.primary, fontWeight: 'bold', fontSize: 16 }}>
              Tên quy tắc
            </Text>
            <Input style={{
              borderColor: COLOR.greyLight, borderWidth: 1,
              padding: 0, borderRadius: 5, paddingHorizontal: 10
            }}
              value={ruleName} onChangeText={setRuleName} />
            <Text style={{ marginVertical: 5, color: COLOR.primary, fontWeight: 'bold', fontSize: 16 }}>
              Áp dụng quy tắc cho
            </Text>
            <View style={{
              borderColor: COLOR.greyLight, borderWidth: 1,
              padding: 0, borderRadius: 5
            }}>
              <Picker
                style={{ padding: 0 }}
                mode="dropdown"
                iosIcon={<Icon name="caret-down" color={COLOR.grey} size={16} />}
                placeholder="chọn biểu thức"
                placeholderStyle={{ color: '#bfc6ea' }}
                selectedValue={applyObject.pre_condition_type}
                onValueChange={OnSetApplyObject}
                placeholderIconColor="#007aff">
                {renderApplyObject()}
              </Picker>
            </View>
            {
              ConfigNotifyApplyObject ? renderListIdDimension() : null
            }
            <Text style={{ marginVertical: 5, color: COLOR.primary, fontWeight: 'bold', fontSize: 16 }}>
              Điều kiện
            </Text>
            {renderConditionList()}
            <TouchableOpacity
              onPress={() => addCondition()}
              style={{ width: 200, backgroundColor: COLOR.primary, alignItems: 'center', borderRadius: 10, padding: 3 }}>
              <Text style={{ color: COLOR.white }}>Thêm điều kiện</Text>
            </TouchableOpacity>
            <Text style={{ marginVertical: 5, color: COLOR.primary, fontWeight: 'bold', fontSize: 16 }}>
              Cài đặt quy tắc
            </Text>
            {renderConfigTime()}

          </ScrollView>



        </Form>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 3,
            justifyContent: 'flex-end',
          }}>
          <Button
            block
            style={[styles.button, { backgroundColor: COLOR.primary }]}
            onPress={handleSubmit(onSubmitData)}>
            <Text style={{ color: COLOR.white }}>Xác nhận</Text>
          </Button>
          <Button
            block
            style={[styles.button, { backgroundColor: COLOR.danger }]}
            onPress={toggleModal}>
            <Text style={{ color: COLOR.white }}>Hủy</Text>
          </Button>
        </View>
      </View>
    </Modal >
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLOR.white,
    borderRadius: 5,
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLOR.greyDark,
    marginBottom: 3,
    textAlign: 'center',
  },
  button: {
    margin: 3,
    backgroundColor: COLOR.secondary,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 5,
    width: 100
  },
});

export default ModalConfigNotify;
