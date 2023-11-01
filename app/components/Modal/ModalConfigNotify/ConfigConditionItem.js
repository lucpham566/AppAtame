import { Button, Form, Item, Input, Label, Picker } from 'native-base';
import React, { useEffect, useState } from 'react';
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

function ConfigConditionItem(props) {
    const { index, item, setCondition } = props

    const show = useSelector(store => store.account.showModalConfigNotify);
    const [rangeType, setRangeType] = useState('TODAY');
    const [matchType, setMatchType] = useState('GT');
    const [value1, setValue1] = useState("0");
    const [value2, setValue2] = useState("0");
    const [subjectType, setSubjectType] = useState("spend");

    const currentShop = useSelector(store => store.account.currentShop);
    const currentAdsAccount = useSelector(store => store.account.currentAdsAccount);

    useEffect(() => {
        let values = [];
        if (matchType === "BETWEEN") {
            values = [value1, value2];
        } else {
            values = [value1];
        }

        const data = {
            "subject_type": subjectType,
            "range_type": rangeType,
            "calculation_type": "OF_EACH_OBJECT",
            "match_type": matchType,
            "values": values
        }

        setCondition(index, data);

    }, [rangeType, matchType, value1, value2, subjectType])

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
        <View style={{ borderColor: COLOR.greyDark, borderWidth: 1, padding: 10, borderRadius: 10, marginBottom: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: COLOR.greyDark, fontWeight: 'bold' }}>Điều kiện {index + 1}</Text>
            </View>
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
        </View>
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

export default ConfigConditionItem;
