import { Button, Form, Item, Input, Label, Picker } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from '../../../helpers/formatNumber';
import { COLOR } from '../../../theme';
import { useForm, Controller } from 'react-hook-form';
import { updateAdsQuota } from '../../../features/BaoCaoHieuQuaScreen/actions';
import { hideModalConfigNotify } from '../../../features/MainScreen/actions';
import { createAutomatedRule } from '../../../apis/tongQuan';
import Icon from 'react-native-vector-icons/FontAwesome';

function ModalConfigNotify(props) {
  const show = useSelector(store => store.account.showModalConfigNotify);
  const [rangeType, setRangeType] = useState('TODAY');
  const [matchType, setMatchType] = useState('TODAY');
  const [value1, setValue1] = useState("0");
  const [value2, setValue2] = useState("0");
  const [subjectType, setSubjectType] = useState("spend");

  const currentShop = useSelector(store => store.account.currentShop);
  const currentAdsAccount = useSelector(store => store.account.currentAdsAccount);

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

  const toggleModal = () => {
    reset();
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
    let values = [];
    if (matchType === "BETWEEN") {
      values = [value1];
    } else {
      values = [value1, value2];
    }
    const data = {
      "advertiser_id": currentAdsAccount.advertiser_id,
      "rules": [
        {
          "name": "Quy tắc mới",
          "notification": {
            "notification_type": "FIREBASE_NOTIFY",
            "email_setting": {
              "notification_period": "EVERY_TIME",
              "email_exec_time": [],
              "no_result_notification": false,
              "mute_option": "UNMUTE"
            }
          },
          "rule_exec_info": {
            "exec_time_type": "PER_HALF_HOUR",
            "exec_time": "",
            "time_period_info": []
          },
          "apply_objects": [
            {
              "dimension": "CAMPAIGN",
              "dimension_ids": [
                "1779911139427329"
              ],
              "pre_condition_type": "SELECTED"
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
          "conditions": [
            {
              "subject_type": subjectType,
              "range_type": rangeType,
              "calculation_type": "OF_EACH_OBJECT",
              "match_type": matchType,
              "values": values
            }
          ]
        }
      ]
    }

    try {
      const response = await createAutomatedRule(data, currentShop.id)
      console.log(response, "response. đâfdsasafd");
    } catch (error) {
      console.log(error?.response?.data, "error. #1209");
      console.log(error, "error. #1209");
    }

  };

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

  return (
    <Modal isVisible={show}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Chỉnh sửa quy tắc
        </Text>
        <Form style={{ width: '100%', marginVertical: 10 }}>
          {/* {option === 'total_quota' ? (
            <>
              <Controller
                control={control}
                rules={{
                  required: 'Không được để trống',
                  min: 100000,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Item regular>
                    <Input
                      keyboardType="numeric"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Nhập ngân sách tối đa"
                    />
                  </Item>
                )}
                name="total_quota"
              />
              {handleError('total_quota', errors)}
            </>
          ) : (
            <>
              <Controller
                control={control}
                rules={{
                  required: 'Không được để trống',
                  min: 5000,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Item regular>
                    <Input
                      keyboardType="numeric"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Nhập ngân sách hàng ngày"
                    />
                  </Item>
                )}
                name="daily_quota"
              />
              {handleError('daily_quota', errors)}
            </>
          )} */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Điều kiện</Text>
            <Picker
              style={{ padding: 0 }}
              mode="dropdown"
              iosIcon={<Icon name="caret-down" color={COLOR.grey} size={16} />}
              placeholder="chọn biểu thức"
              placeholderStyle={{ color: '#bfc6ea' }}
              selectedValue={subjectType}
              onValueChange={setSubjectType}
              placeholderIconColor="#007aff">
              {renderPickerSubjectType()}
            </Picker>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Khoảng thời gian</Text>
            <Picker
              style={{ padding: 0 }}
              mode="dropdown"
              iosIcon={<Icon name="caret-down" color={COLOR.grey} size={16} />}
              placeholder="chọn biểu thức"
              placeholderStyle={{ color: '#bfc6ea' }}
              selectedValue={rangeType}
              onValueChange={setRangeType}
              placeholderIconColor="#007aff">
              <Picker.Item
                style={{ fontSize: 13 }}
                value={"TODAY"}
                label={"Hôm nay"}
              />
              <Picker.Item
                style={{ fontSize: 13 }}
                value={"YESTERDAY"}
                label={"Hôm qua"}
              />
              <Picker.Item
                style={{ fontSize: 13 }}
                value={"PAST_THREE_DAYS"}
                label={"3 ngày qua"}
              />
              <Picker.Item
                style={{ fontSize: 13 }}
                value={"PAST_FIVE_DAYS"}
                label={"5 ngày qua"}
              />
              <Picker.Item
                style={{ fontSize: 13 }}
                value={"PAST_SEVEN_DAYS"}
                label={"7 ngày qua"}
              />
              <Picker.Item
                style={{ fontSize: 13 }}
                value={"PAST_THIRTY_DAYS"}
                label={"30 ngày qua"}
              />
              <Picker.Item
                style={{ fontSize: 13 }}
                value={"LIFETIME"}
                label={"Trọn đời"}
              />
            </Picker>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Biểu thức</Text>
            <Picker
              style={{ padding: 0 }}
              mode="dropdown"
              iosIcon={<Icon name="caret-down" color={COLOR.grey} size={16} />}
              placeholder="chọn biểu thức"
              placeholderStyle={{ color: '#bfc6ea' }}
              selectedValue={matchType}
              onValueChange={setMatchType}
              placeholderIconColor="#007aff">
              <Picker.Item
                style={{ fontSize: 13 }}
                value={"GT"}
                label={"Lớn hơn"}
              />
              <Picker.Item
                style={{ fontSize: 13 }}
                value={"LT"}
                label={"Bé hơn"}
              />
              <Picker.Item
                style={{ fontSize: 13 }}
                value={"BETWEEN"}
                label={"Trong khoảng"}
              />
            </Picker>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Giá trị</Text>
            <Input style={{
              marginHorizontal: 10, borderColor: COLOR.greyLight, borderWidth: 1,
              height: 30, padding: 0, borderRadius: 5
            }}
              keyboardType="numeric" value={value1} onChangeText={setValue1} />
            {
              matchType == "BETWEEN" &&
              <>
                <Text>{"-"}</Text>
                <Input style={{
                  marginHorizontal: 10, borderColor: COLOR.greyLight, borderWidth: 1,
                  height: 30, padding: 0, borderRadius: 5
                }}
                  keyboardType="numeric" value={value2} onChangeText={setValue2} />
              </>
            }

          </View>
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLOR.white,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.grey,
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
