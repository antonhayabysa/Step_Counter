import React, {useState, useEffect} from "react";
import {StatusBar} from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
} from "react-native";
import {Pedometer} from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";

export default function App() {
    const [PedomaterAvailability, SetPedomaterAvailability] = useState("");
    const [StepCount, SetStepCount] = useState(777);

    var WindowHeight = Dimensions.get("window").height;
    var Dist = StepCount / 1300;
    var DistanceCovered = Dist.toFixed(4);
    var cal = DistanceCovered * 60;
    var caloriesBurnt = cal.toFixed(4);

    useEffect(() => {

        subscribe();

    }, []);


    const subscribe = () => {
        const subscription = Pedometer.watchStepCount((result) => {
            SetStepCount(result.steps);
        });

        Pedometer.isAvailableAsync().then(
            (result) => {
                SetPedomaterAvailability(String(result));
            },
            (error) => {
                SetPedomaterAvailability(error);
            }
        );
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                style={{flex: 1}}
                source={require("./assets/running.jpg")}
                resizeMode="cover">
                <View style={{flex: 1, justifyContent: "center"}}>
                    <Text style={styles.headingDesign}>
                        Is Pedometer available on the device : {PedomaterAvailability}
                    </Text>
                </View>
                <View style={{flex: 3}}>
                    <CircularProgress
                        value={StepCount}
                        maxValue={6500}
                        radius={180}
                        textColor={"#B041FF"}
                        activeStrokeColor={"#f39c12"}
                        inActiveStrokeColor={"#9b59b6"}
                        inActiveStrokeOpacity={0.5}
                        inActiveStrokeWidth={40}
                        activeStrokeWidth={40}
                        title={"Step Count"}
                        titleColor={"black"}
                        titleStyle={{fontWeight: "bold"}}
                    />
                </View>
                <View style={{flex: 1, justifyContent: "center"}}>
                    <View style={{flex: 1}}>
                        <Text
                            style={[styles.textDesign,
                                {paddingLeft: 20, marginLeft: '13%'},]}>
                            Target : 6500 steps(5kms)
                        </Text>
                    </View>
                    <View style={{flex: 1}}><Text
                        style={[
                                styles.textDesign,
                                {width: "93%", paddingLeft: 20, marginLeft: '-3.5%'},
                            ]}
                        >
                            Distance Covered : {DistanceCovered} km
                        </Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text
                            style={[
                                styles.textDesign,
                                {paddingLeft: 10, marginLeft: '23%'},
                            ]}
                        >
                            Calories Burnt : {caloriesBurnt}
                        </Text>
                    </View>
                    <StatusBar style="auto"/>
                </View>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headingDesign: {
        alignSelf: "center",
        fontSize: 17,
        color: "black",
        fontWeight: "bold",
    },
    textDesign: {
        height: 50,
        width: '85%',
        borderColor: "white",
        overflow: "hidden",
        fontSize: 17,
        color: "black",
        fontWeight: "bold",
        fontFamily: "Papyrus",
    },
});
