import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import logo from '../assets/images/logo.png';
import { Dimensions } from 'react-native';
import { Svg, Path } from 'react-native-svg';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const originalWidth = 390;
const originalHeight = 364;

const scaleFactor = screenWidth / originalWidth;
const svgHeight = originalHeight * scaleFactor;

const svgPositionY = screenHeight - svgHeight;

const leftSvgAnimation = new Animated.Value(-screenWidth / 2);
const rightSvgAnimation = new Animated.Value(screenWidth);

const animateSvg = () => {
  // Устанавливаем начальные значения
  leftSvgAnimation.setValue(-screenWidth / 2);
  rightSvgAnimation.setValue(screenWidth);

  // Создаем анимацию
  const duration = 600; // продолжительность анимации в миллисекундах
  Animated.parallel([
    Animated.timing(leftSvgAnimation, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }),
    Animated.timing(rightSvgAnimation, {
      toValue: screenWidth / 2,
      duration,
      useNativeDriver: true,
    }),
  ]).start();
};

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    animateSvg();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('Chat');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Svg
        style={styles.cloud}
        width={screenWidth}
        height={svgHeight}
        viewBox="0 0 390 364" // Установите правильное значение в соответствии с размерами вашего SVG
        preserveAspectRatio="xMidYMin slice"
      >
      <Path d="M-536.685 506.675C-434.066 560.959 -315.768 538.614 -272.455 456.759C-266.702 445.866 -262.455 434.243 -259.831 422.206C-255.164 430.697 -247.749 437.348 -238.804 441.067C-229.858 444.787 -219.913 445.355 -210.603 442.677C-201.292 439.999 -193.169 434.235 -187.566 426.331C-181.963 418.426 -179.215 408.852 -179.771 399.18C-169.431 408.583 -156.271 414.301 -142.342 415.442C-128.414 416.584 -114.498 413.085 -102.765 405.492C-95.6597 408.283 -87.7752 408.36 -80.6164 405.708C-73.4576 403.057 -67.5257 397.862 -63.9527 391.115C-60.3797 384.369 -59.4158 376.543 -61.2449 369.131C-63.0739 361.719 -67.568 355.24 -73.8693 350.93C-74.0257 344.626 -75.1191 338.38 -77.1137 332.398C-74.6496 330.732 -72.3043 328.897 -70.0948 326.906C-70.661 336.583 -67.9173 346.165 -62.3149 354.076C-56.7124 361.987 -48.5848 367.756 -39.2686 370.434C-29.9523 373.112 -20.0021 372.54 -11.0541 368.811C-2.10614 365.083 5.30676 358.421 9.96564 349.92C12.5814 361.959 16.8286 373.583 22.5895 384.473C65.902 466.341 184.175 488.686 286.82 434.401C307.812 423.338 327.182 409.439 344.384 393.095C361.919 456.822 421.63 513.833 502.789 535.85C614.838 566.249 725.322 518.428 749.573 429.036C754.44 410.999 755.574 392.157 752.905 373.666C769.341 363.288 782.436 348.391 790.622 330.761C798.808 313.13 801.738 293.513 799.06 274.26C796.383 255.007 788.211 236.934 775.525 222.206C762.838 207.478 746.175 196.72 727.531 191.221C727.721 190.678 727.91 190.135 728.061 189.567C729.11 185.708 729.039 181.63 727.858 177.809C726.677 173.988 724.434 170.581 721.391 167.986C718.347 165.391 714.629 163.715 710.669 163.153C706.71 162.591 702.672 163.166 699.027 164.811C699.012 157.82 696.72 151.023 692.497 145.45C688.274 139.878 682.351 135.833 675.624 133.928C668.897 132.024 661.732 132.363 655.215 134.894C648.698 137.426 643.183 142.012 639.505 147.958C635.901 144.652 631.673 142.098 627.07 140.446C622.466 138.793 617.58 138.075 612.696 138.334C607.812 138.592 603.028 139.822 598.625 141.952C594.222 144.081 590.288 147.067 587.053 150.735C591.312 144.188 593.777 136.638 594.203 128.839C594.629 121.041 593 113.267 589.479 106.295C585.958 99.3233 580.669 93.3981 574.14 89.1118C567.611 84.8256 560.071 82.3285 552.274 81.8702C552.594 79.756 552.754 77.6207 552.754 75.4824C552.754 68.9344 551.227 62.4765 548.295 56.6218C545.363 50.7671 541.106 45.6768 535.862 41.7552C530.618 37.8337 524.532 35.1889 518.088 34.031C511.643 32.8731 505.017 33.2339 498.736 35.0849C486.078 21.7389 469.186 13.1932 450.935 10.9029C432.685 8.61265 414.205 12.7193 398.642 22.5238C397.83 18.3396 395.625 14.5538 392.387 11.7832C389.148 9.01261 385.066 7.42068 380.807 7.26694C376.548 7.1132 372.362 8.40668 368.932 10.9365C365.502 13.4664 363.03 17.0835 361.919 21.1983C361.618 22.327 361.42 23.4804 361.326 24.6446C360.631 24.4048 359.924 24.1523 359.192 23.9503C352.353 22.0959 345.073 22.7797 338.699 25.8753C332.325 28.9709 327.286 34.2692 324.514 40.7911C310.917 29.8654 294.736 22.6264 277.528 19.7717C273.927 13.7436 268.824 8.75285 262.717 5.28731C256.61 1.82178 249.708 0 242.687 0C235.665 0 228.763 1.82178 222.656 5.28731C216.549 8.75285 211.446 13.7436 207.845 19.7717C205.255 18.088 202.327 16.9941 199.267 16.5672C196.208 16.1403 193.092 16.391 190.14 17.3015C187.189 18.212 184.473 19.76 182.186 21.8361C179.898 23.9122 178.095 26.4656 176.904 29.3156C172.119 24.2195 165.804 20.8208 158.915 19.6341C152.026 18.4474 144.938 19.5372 138.724 22.7385C132.51 25.9399 127.508 31.0785 124.475 37.3767C121.441 43.6748 120.543 50.7897 121.914 57.6444C117.02 57.6893 112.184 58.7102 107.689 60.6472C103.194 62.5843 99.1306 65.3985 95.7368 68.9253C92.3429 72.4521 89.6867 76.6206 87.9236 81.1866C86.1605 85.7527 85.326 90.6245 85.4689 95.517C83.7136 85.5448 78.6156 76.4673 71.0139 69.7787C63.4122 63.0901 53.7599 59.1889 43.6456 58.7172C33.5314 58.2455 23.5579 61.2313 15.3667 67.1834C7.17548 73.1355 1.25482 81.6991 -1.42102 91.4646C-3.5683 91.952 -5.67773 92.5934 -7.73297 93.3835C-17.7193 83.778 -30.0417 76.9483 -43.4798 73.5709C-56.9178 70.1935 -71.005 70.3856 -84.3459 74.1281C-97.6869 77.8707 -109.819 85.0338 -119.539 94.908C-129.26 104.782 -136.232 117.025 -139.766 130.423C-142.556 128.403 -145.846 127.185 -149.279 126.902C-152.712 126.619 -156.157 127.281 -159.24 128.818C-162.323 130.354 -164.926 132.706 -166.767 135.617C-168.609 138.528 -169.618 141.888 -169.684 145.332C-182.502 142.48 -195.825 142.839 -208.471 146.376C-221.116 149.913 -232.693 156.519 -242.171 165.607C-244.225 164.815 -246.335 164.174 -248.483 163.688C-251.169 153.932 -257.093 145.38 -265.283 139.437C-273.472 133.494 -283.44 130.514 -293.547 130.985C-303.655 131.456 -313.301 135.352 -320.902 142.031C-328.503 148.711 -333.606 157.777 -335.373 167.74C-335.228 162.848 -336.061 157.977 -337.823 153.411C-339.584 148.845 -342.239 144.676 -345.632 141.149C-349.025 137.622 -353.087 134.808 -357.582 132.871C-362.076 130.933 -366.911 129.912 -371.805 129.868C-370.438 123.014 -371.339 115.901 -374.374 109.606C-377.408 103.31 -382.41 98.1744 -388.624 94.975C-394.837 91.7756 -401.923 90.6868 -408.81 91.8734C-415.697 93.0599 -422.01 96.4573 -426.795 101.551C-428.336 97.862 -430.894 94.6867 -434.171 92.3955C-437.448 90.1043 -441.308 88.7915 -445.302 88.6103C-449.297 88.429 -453.26 89.3867 -456.731 91.3717C-460.202 93.3567 -463.037 96.2873 -464.906 99.8219C-465.171 100.34 -465.411 100.87 -465.638 101.4C-483.014 92.6853 -502.534 89.166 -521.86 91.2638C-541.185 93.3616 -559.495 100.987 -574.597 113.228C-589.698 125.468 -600.95 141.803 -607.004 160.275C-613.058 178.748 -613.657 198.574 -608.73 217.379C-623.304 229.067 -635.333 243.614 -644.077 260.124C-687.389 342.005 -639.305 452.391 -536.685 506.675Z" fill="#FDF4E5"/>
      </Svg>
      <Animated.Image
        source={logo}
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
      <Animated.View
        style={{
          position: 'absolute',
          left: leftSvgAnimation,
          top: 0, // Задайте нужную позицию по вертикали
          transform: [{ translateX: leftSvgAnimation }],
        }}
      >
        <Svg width={screenWidth / 2} height={svgHeight}>
          <path d="M166.437 11.4803C175.101 16.5575 182.743 24.2362 191.883 28.5641C192.056 28.6415 192.209 28.7576 192.33 28.9035C192.452 29.0494 192.538 29.2212 192.583 29.4057C192.627 29.5902 192.629 29.7825 192.588 29.9678C192.546 30.1531 192.463 30.3264 192.344 30.4744C189.851 33.4745 186.105 35.7601 180.989 34.3468C174.558 32.5698 167.682 24.8303 161.625 21.9674C155.677 19.1538 151.218 22.9808 145.483 19.0929C143.374 18.0653 149.879 11.4168 151.2 10.1627C155.855 9.59586 161.545 9.21924 165.871 11.2706C165.815 11.3107 165.759 11.3599 166.437 11.4803Z" fill="#3D5CFF"/>
          <path d="M133.517 22.1348C150.005 23.4925 153.191 31.8209 161.174 40.1713C166.001 45.2188 172.197 44.2908 175.741 40.9944C176.016 40.7375 176.182 40.3857 176.206 40.0105C176.23 39.6354 176.11 39.2652 175.871 38.9754C173.187 35.7579 168.487 31.9865 165.634 28.8739C156.25 17.5468 151.539 11.7214 137.093 18.7983C136.174 19.1581 135.474 19.8233 134.616 20.3061C133.693 20.5481 132.389 21.0658 133.517 22.1348Z" fill="#3D5CFF"/>
          <path d="M145.564 30.1727C148.869 37.9135 145.282 47.826 142.429 57.6104C142.386 57.7555 142.315 57.8904 142.218 58.0071C142.122 58.1239 142.004 58.2202 141.87 58.2903C141.736 58.3604 141.589 58.4029 141.439 58.4153C141.288 58.4277 141.136 58.4097 140.993 58.3624C137.243 57.1795 135.313 55.8619 134.603 50.606C134.055 46.5435 135.364 41.0417 134.81 37.0166C133.525 27.6593 120.369 26.7145 120.3 25.4811C121.97 22.1161 130.57 20.8387 133.126 18.2334C134.37 18.478 143.789 26.0156 145.564 30.1727Z" fill="#3D5CFF"/>
          <path d="M-11.8666 124.015C11.5913 92.5959 34.5902 62.7406 70.447 43.5147C82.7734 36.9051 93.1135 45.1105 101.153 46.5148C118.533 49.551 126.349 46.0061 139.229 48.8444C144.522 50.0092 153.623 54.4484 154.865 47.7158C155.659 43.4138 150.58 40.8823 140.085 38.1061C137.584 37.4448 122.255 33.1673 117.637 30.5815C115.873 29.594 116.84 28.7993 117.738 28.6272C125.675 27.1065 129.722 25.0875 135.638 21.9476C144.959 17.5472 154.927 16.6801 166.592 16.7371C174.61 16.7772 185.343 16.5326 193.322 15.0636C198.974 14.0282 203.85 9.59936 202.109 4.0238C202.003 3.68742 201.782 3.39948 201.484 3.21128C201.186 3.02309 200.831 2.94686 200.482 2.99618C182.326 5.65842 180.955 4.29041 165.815 3.98756C158.356 3.83613 131.676 0.961648 124.465 0.287352C106.937 -1.34985 95.9973 4.17005 60.7922 12.7418C49.3232 15.5334 38.3908 24.2384 34.9937 27.7134C25.3932 37.5302 1.72449 59.4946 -25 74.5491L-11.8666 124.015Z" fill="#F74945"/>
        </Svg>
      </Animated.View>

      <Animated.View
        style={{
          position: 'absolute',
          left: rightSvgAnimation,
          top: 0, // Задайте нужную позицию по вертикали
          transform: [{ translateX: rightSvgAnimation }],
        }}
      >
        <Svg width={screenWidth / 2} height={svgHeight}>
          {/* svg here */}
        </Svg>
      </Animated.View>
    </View>
  );
  
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDE6EA',
  },
  cloud: {
    position: 'absolute',
    bottom: '-1.5%',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
  },
});


export default SplashScreen;
