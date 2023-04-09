import React, { useState, useEffect } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';
import  { Svg, Path } from 'react-native-svg';
import { Dimensions } from 'react-native';
import logo from '../assets/images/logo.png';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const originalWidth = 390;
const originalHeight = 364;

const scaleFactor = screenWidth / originalWidth;
const svgHeight = originalHeight * scaleFactor;

const svgPositionY = screenHeight - svgHeight;

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [showText, setShowText] = useState(false);
  
  useEffect(() => {
    Animated.sequence([
      // Fade in logo
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Fade out logo
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Change to text and fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('Chat');
    });

    // Wait 2 seconds before showing the text
    setTimeout(() => {
      setShowText(true);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoTextContainer}>
        {!showText ? (
          <Animated.Image
            source={logo}
            style={[styles.logo, { opacity: fadeAnim }]}
            resizeMode="contain"
          />
        ) : (
          <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
          Все, о чем можно спросить
        </Animated.Text>
        )}
      </View>
      <View style={styles.svgContainer}>
        <Svg
          style={styles.cloud}
          width={screenWidth}
          height={svgHeight}
          viewBox="0 0 390 364" // Установите правильное значение в соответствии с размерами вашего SVG
          preserveAspectRatio="xMidYMin slice"
        >
        <Path d="M-536.685 506.675C-434.066 560.959 -315.768 538.614 -272.455 456.759C-266.702 445.866 -262.455 434.243 -259.831 422.206C-255.164 430.697 -247.749 437.348 -238.804 441.067C-229.858 444.787 -219.913 445.355 -210.603 442.677C-201.292 439.999 -193.169 434.235 -187.566 426.331C-181.963 418.426 -179.215 408.852 -179.771 399.18C-169.431 408.583 -156.271 414.301 -142.342 415.442C-128.414 416.584 -114.498 413.085 -102.765 405.492C-95.6597 408.283 -87.7752 408.36 -80.6164 405.708C-73.4576 403.057 -67.5257 397.862 -63.9527 391.115C-60.3797 384.369 -59.4158 376.543 -61.2449 369.131C-63.0739 361.719 -67.568 355.24 -73.8693 350.93C-74.0257 344.626 -75.1191 338.38 -77.1137 332.398C-74.6496 330.732 -72.3043 328.897 -70.0948 326.906C-70.661 336.583 -67.9173 346.165 -62.3149 354.076C-56.7124 361.987 -48.5848 367.756 -39.2686 370.434C-29.9523 373.112 -20.0021 372.54 -11.0541 368.811C-2.10614 365.083 5.30676 358.421 9.96564 349.92C12.5814 361.959 16.8286 373.583 22.5895 384.473C65.902 466.341 184.175 488.686 286.82 434.401C307.812 423.338 327.182 409.439 344.384 393.095C361.919 456.822 421.63 513.833 502.789 535.85C614.838 566.249 725.322 518.428 749.573 429.036C754.44 410.999 755.574 392.157 752.905 373.666C769.341 363.288 782.436 348.391 790.622 330.761C798.808 313.13 801.738 293.513 799.06 274.26C796.383 255.007 788.211 236.934 775.525 222.206C762.838 207.478 746.175 196.72 727.531 191.221C727.721 190.678 727.91 190.135 728.061 189.567C729.11 185.708 729.039 181.63 727.858 177.809C726.677 173.988 724.434 170.581 721.391 167.986C718.347 165.391 714.629 163.715 710.669 163.153C706.71 162.591 702.672 163.166 699.027 164.811C699.012 157.82 696.72 151.023 692.497 145.45C688.274 139.878 682.351 135.833 675.624 133.928C668.897 132.024 661.732 132.363 655.215 134.894C648.698 137.426 643.183 142.012 639.505 147.958C635.901 144.652 631.673 142.098 627.07 140.446C622.466 138.793 617.58 138.075 612.696 138.334C607.812 138.592 603.028 139.822 598.625 141.952C594.222 144.081 590.288 147.067 587.053 150.735C591.312 144.188 593.777 136.638 594.203 128.839C594.629 121.041 593 113.267 589.479 106.295C585.958 99.3233 580.669 93.3981 574.14 89.1118C567.611 84.8256 560.071 82.3285 552.274 81.8702C552.594 79.756 552.754 77.6207 552.754 75.4824C552.754 68.9344 551.227 62.4765 548.295 56.6218C545.363 50.7671 541.106 45.6768 535.862 41.7552C530.618 37.8337 524.532 35.1889 518.088 34.031C511.643 32.8731 505.017 33.2339 498.736 35.0849C486.078 21.7389 469.186 13.1932 450.935 10.9029C432.685 8.61265 414.205 12.7193 398.642 22.5238C397.83 18.3396 395.625 14.5538 392.387 11.7832C389.148 9.01261 385.066 7.42068 380.807 7.26694C376.548 7.1132 372.362 8.40668 368.932 10.9365C365.502 13.4664 363.03 17.0835 361.919 21.1983C361.618 22.327 361.42 23.4804 361.326 24.6446C360.631 24.4048 359.924 24.1523 359.192 23.9503C352.353 22.0959 345.073 22.7797 338.699 25.8753C332.325 28.9709 327.286 34.2692 324.514 40.7911C310.917 29.8654 294.736 22.6264 277.528 19.7717C273.927 13.7436 268.824 8.75285 262.717 5.28731C256.61 1.82178 249.708 0 242.687 0C235.665 0 228.763 1.82178 222.656 5.28731C216.549 8.75285 211.446 13.7436 207.845 19.7717C205.255 18.088 202.327 16.9941 199.267 16.5672C196.208 16.1403 193.092 16.391 190.14 17.3015C187.189 18.212 184.473 19.76 182.186 21.8361C179.898 23.9122 178.095 26.4656 176.904 29.3156C172.119 24.2195 165.804 20.8208 158.915 19.6341C152.026 18.4474 144.938 19.5372 138.724 22.7385C132.51 25.9399 127.508 31.0785 124.475 37.3767C121.441 43.6748 120.543 50.7897 121.914 57.6444C117.02 57.6893 112.184 58.7102 107.689 60.6472C103.194 62.5843 99.1306 65.3985 95.7368 68.9253C92.3429 72.4521 89.6867 76.6206 87.9236 81.1866C86.1605 85.7527 85.326 90.6245 85.4689 95.517C83.7136 85.5448 78.6156 76.4673 71.0139 69.7787C63.4122 63.0901 53.7599 59.1889 43.6456 58.7172C33.5314 58.2455 23.5579 61.2313 15.3667 67.1834C7.17548 73.1355 1.25482 81.6991 -1.42102 91.4646C-3.5683 91.952 -5.67773 92.5934 -7.73297 93.3835C-17.7193 83.778 -30.0417 76.9483 -43.4798 73.5709C-56.9178 70.1935 -71.005 70.3856 -84.3459 74.1281C-97.6869 77.8707 -109.819 85.0338 -119.539 94.908C-129.26 104.782 -136.232 117.025 -139.766 130.423C-142.556 128.403 -145.846 127.185 -149.279 126.902C-152.712 126.619 -156.157 127.281 -159.24 128.818C-162.323 130.354 -164.926 132.706 -166.767 135.617C-168.609 138.528 -169.618 141.888 -169.684 145.332C-182.502 142.48 -195.825 142.839 -208.471 146.376C-221.116 149.913 -232.693 156.519 -242.171 165.607C-244.225 164.815 -246.335 164.174 -248.483 163.688C-251.169 153.932 -257.093 145.38 -265.283 139.437C-273.472 133.494 -283.44 130.514 -293.547 130.985C-303.655 131.456 -313.301 135.352 -320.902 142.031C-328.503 148.711 -333.606 157.777 -335.373 167.74C-335.228 162.848 -336.061 157.977 -337.823 153.411C-339.584 148.845 -342.239 144.676 -345.632 141.149C-349.025 137.622 -353.087 134.808 -357.582 132.871C-362.076 130.933 -366.911 129.912 -371.805 129.868C-370.438 123.014 -371.339 115.901 -374.374 109.606C-377.408 103.31 -382.41 98.1744 -388.624 94.975C-394.837 91.7756 -401.923 90.6868 -408.81 91.8734C-415.697 93.0599 -422.01 96.4573 -426.795 101.551C-428.336 97.862 -430.894 94.6867 -434.171 92.3955C-437.448 90.1043 -441.308 88.7915 -445.302 88.6103C-449.297 88.429 -453.26 89.3867 -456.731 91.3717C-460.202 93.3567 -463.037 96.2873 -464.906 99.8219C-465.171 100.34 -465.411 100.87 -465.638 101.4C-483.014 92.6853 -502.534 89.166 -521.86 91.2638C-541.185 93.3616 -559.495 100.987 -574.597 113.228C-589.698 125.468 -600.95 141.803 -607.004 160.275C-613.058 178.748 -613.657 198.574 -608.73 217.379C-623.304 229.067 -635.333 243.614 -644.077 260.124C-687.389 342.005 -639.305 452.391 -536.685 506.675Z" fill="#FDF4E5"/>
        </Svg>
        <Svg 
          style={styles.leftHand} 
          width={screenWidth * 0.51}
          height={125 * scaleFactor}
          viewBox="0 0 203 125"
          preserveAspectRatio="xMinYMin meet"
        >
          <Path d="M166.437 11.4803C175.101 16.5575 182.743 24.2362 191.883 28.5641C192.056 28.6415 192.209 28.7576 192.33 28.9035C192.452 29.0494 192.538 29.2212 192.583 29.4057C192.627 29.5902 192.629 29.7825 192.588 29.9678C192.546 30.1531 192.463 30.3264 192.344 30.4744C189.851 33.4745 186.105 35.7601 180.989 34.3468C174.558 32.5698 167.682 24.8303 161.625 21.9674C155.677 19.1538 151.218 22.9808 145.483 19.0929C143.374 18.0653 149.879 11.4168 151.2 10.1627C155.855 9.59586 161.545 9.21924 165.871 11.2706C165.815 11.3107 165.759 11.3599 166.437 11.4803Z" fill="#3D5CFF"/>
          <Path d="M133.517 22.1348C150.005 23.4925 153.191 31.8209 161.174 40.1713C166.001 45.2188 172.197 44.2908 175.741 40.9944C176.016 40.7375 176.182 40.3857 176.206 40.0105C176.23 39.6354 176.11 39.2652 175.871 38.9754C173.187 35.7579 168.487 31.9865 165.634 28.8739C156.25 17.5468 151.539 11.7214 137.093 18.7983C136.174 19.1581 135.474 19.8233 134.616 20.3061C133.693 20.5481 132.389 21.0658 133.517 22.1348Z" fill="#3D5CFF"/>
          <Path d="M145.564 30.1727C148.869 37.9135 145.282 47.826 142.429 57.6104C142.386 57.7555 142.315 57.8904 142.218 58.0071C142.122 58.1239 142.004 58.2202 141.87 58.2903C141.736 58.3604 141.589 58.4029 141.439 58.4153C141.288 58.4277 141.136 58.4097 140.993 58.3624C137.243 57.1795 135.313 55.8619 134.603 50.606C134.055 46.5435 135.364 41.0417 134.81 37.0166C133.525 27.6593 120.369 26.7145 120.3 25.4811C121.97 22.1161 130.57 20.8387 133.126 18.2334C134.37 18.478 143.789 26.0156 145.564 30.1727Z" fill="#3D5CFF"/>
          <Path d="M-11.8666 124.015C11.5913 92.5959 34.5902 62.7406 70.447 43.5147C82.7734 36.9051 93.1135 45.1105 101.153 46.5148C118.533 49.551 126.349 46.0061 139.229 48.8444C144.522 50.0092 153.623 54.4484 154.865 47.7158C155.659 43.4138 150.58 40.8823 140.085 38.1061C137.584 37.4448 122.255 33.1673 117.637 30.5815C115.873 29.594 116.84 28.7993 117.738 28.6272C125.675 27.1065 129.722 25.0875 135.638 21.9476C144.959 17.5472 154.927 16.6801 166.592 16.7371C174.61 16.7772 185.343 16.5326 193.322 15.0636C198.974 14.0282 203.85 9.59936 202.109 4.0238C202.003 3.68742 201.782 3.39948 201.484 3.21128C201.186 3.02309 200.831 2.94686 200.482 2.99618C182.326 5.65842 180.955 4.29041 165.815 3.98756C158.356 3.83613 131.676 0.961648 124.465 0.287352C106.937 -1.34985 95.9973 4.17005 60.7922 12.7418C49.3232 15.5334 38.3908 24.2384 34.9937 27.7134C25.3932 37.5302 1.72449 59.4946 -25 74.5491L-11.8666 124.015Z" fill="#F74945"/>
        </Svg>

        <Svg 
          style={styles.rightHand} 
          width={screenWidth * 0.51}
          height={123 * scaleFactor} 
          viewBox="0 0 188 123" 
          preserveAspectRatio="xMidYMin meet"
        >
          <Path d="M111.678 49.5397C108.998 51.229 106.838 53.6277 105.438 56.4697C102.668 62.0997 101.438 69.3597 100.928 75.8797C100.218 75.8797 99.5177 75.8797 98.8577 75.8797C96.2377 74.0797 93.2377 72.4397 92.8577 72.7597L91.7177 73.2297C91.1477 71.2297 81.0177 71.8697 79.3277 72.3697C76.4577 76.1197 64.9877 86.3297 64.5277 91.0997C64.5877 91.0997 64.6477 91.0997 64.4177 91.6997C64.4177 101.7 66.8877 111.17 66.7477 121.29C66.7396 121.482 66.7773 121.674 66.8577 121.85C66.9323 122.023 67.0492 122.174 67.1977 122.29C67.3408 122.414 67.5127 122.5 67.6977 122.54C67.8817 122.585 68.0738 122.585 68.2577 122.54C72.0477 121.62 75.5077 120.91 76.8577 115.77C77.8577 112.04 77.1777 107.17 76.5477 102.44C76.6777 103 76.7977 103.58 76.9277 104.16C77.6077 108.33 79.0477 114.41 79.9277 118.51C80.0097 118.874 80.2235 119.194 80.5277 119.41C80.8378 119.621 81.2167 119.707 81.5877 119.65C86.3677 118.9 90.9277 114.59 89.9377 107.65C88.8677 100.13 86.3477 95.7197 87.2477 91.2797C87.5754 90.4481 88.1651 89.746 88.9277 89.2797C88.7756 89.9089 88.6918 90.5526 88.6777 91.1997C88.6777 99.6097 97.6777 101.78 106.608 106.67C106.879 106.812 107.194 106.844 107.488 106.76C107.634 106.713 107.77 106.638 107.888 106.54C108.002 106.44 108.094 106.318 108.158 106.18C109.978 102.69 110.248 99.8297 107.668 96.6297C106.355 95.2641 104.841 94.1073 103.178 93.1997C101.398 92.0397 101.588 91.8397 101.658 90.3597C101.998 83.3597 113.948 83.9897 122.338 77.3597C126.168 74.3597 128.718 70.5997 131.868 67.1197C134.498 64.2297 140.468 60.9997 144.388 60.1197C136.778 51.4397 123.208 49.2097 111.678 49.5397Z" fill="#3D5CFF"/>
          <Path d="M229.778 37C191.288 44.38 175.778 53.07 136.278 62.77C125.068 65.52 120.148 67.48 115.628 72.36C111.888 76.36 107.138 78.87 99.3277 82.14C88.1277 86.84 87.0877 83.57 62.5677 97.5C57.6977 100.26 51.4577 101.92 49.0177 97.06C47.2477 93.55 50.0177 91.73 58.6677 86.46C66.9777 81.46 68.4077 78.31 72.6677 75.2C73.8477 74.35 73.2677 73.29 71.7177 73.84C67.8377 75.21 67.5777 75.84 59.9377 76.24C49.6477 76.76 43.2477 78.24 36.4977 81.81C31.4077 84.49 20.8577 90.87 13.2877 93.81C7.98768 95.84 1.56768 94.73 0.0376797 89.09C-0.0399347 88.7275 0.0030639 88.3496 0.160125 88.0138C0.317187 87.678 0.579701 87.4028 0.90768 87.23C17.7377 79 24.1677 73.12 33.3677 67.76C39.8177 64 62.9877 55.64 69.9877 52.32C85.7977 44.88 116.118 43.54 132.078 38.32C162.798 28.25 189.988 15.68 223.558 0L229.778 37Z" fill="#240E54"/>
          <Path d="M143.398 40.7998C144.266 40.7985 145.115 40.541 145.837 40.0595C146.56 39.5779 147.124 38.8938 147.459 38.0929C147.794 37.292 147.886 36.4099 147.722 35.5573C147.558 34.7046 147.146 33.9193 146.538 33.2998C144.044 34.2131 141.544 35.1031 139.038 35.9698C139.011 36.1085 138.994 36.2488 138.988 36.3898C138.988 37.5594 139.452 38.6811 140.279 39.5081C141.106 40.3352 142.228 40.7998 143.398 40.7998Z" fill="#F74945"/>
          <Path d="M173.758 42.4597C174.142 42.6264 174.568 42.6684 174.978 42.5797C175.392 42.5017 175.772 42.2994 176.068 41.9997C176.369 41.7093 176.572 41.3315 176.648 40.9197C176.71 40.6122 176.703 40.2947 176.627 39.9902C176.552 39.6858 176.409 39.402 176.21 39.1597C176.011 38.9173 175.76 38.7224 175.476 38.5892C175.192 38.456 174.881 38.3879 174.568 38.3897C174.007 38.3923 173.47 38.6169 173.075 39.0141C172.68 39.4114 172.458 39.9492 172.458 40.5097C172.446 40.9356 172.564 41.355 172.796 41.7122C173.028 42.0694 173.364 42.3475 173.758 42.5097V42.4597Z" fill="#FFB2C6"/>
          <Path d="M131.388 51.8903C131.04 51.6537 130.628 51.5282 130.208 51.5303C129.929 51.5301 129.653 51.5847 129.396 51.6911C129.139 51.7974 128.905 51.9535 128.708 52.1503C128.361 52.4978 128.145 52.9549 128.098 53.4437C128.05 53.9325 128.174 54.4226 128.448 54.8303C128.678 55.1805 129.009 55.4525 129.398 55.6103C129.785 55.7693 130.211 55.8105 130.622 55.7286C131.033 55.6468 131.411 55.4457 131.708 55.1503C132.002 54.8501 132.203 54.4717 132.288 54.0603C132.37 53.6501 132.328 53.2248 132.168 52.8385C132.007 52.4521 131.736 52.1221 131.388 51.8903Z" fill="#7BC8FF"/>
          <Path d="M114.638 66.0602C114.478 65.9534 114.293 65.8918 114.101 65.8822C113.909 65.8726 113.718 65.9152 113.549 66.0056C113.379 66.0959 113.238 66.2306 113.139 66.3952C113.04 66.5598 112.988 66.7482 112.988 66.9402C112.986 67.1476 113.049 67.3502 113.168 67.5202C113.278 67.6998 113.443 67.8398 113.638 67.9202C113.834 67.9996 114.05 68.0204 114.258 67.9802C114.463 67.9389 114.651 67.8376 114.799 67.6893C114.947 67.541 115.047 67.3523 115.088 67.147C115.129 66.9416 115.108 66.7288 115.027 66.5354C114.947 66.342 114.812 66.1767 114.638 66.0602Z" fill="#FF5653"/>
          <Path d="M62.9877 73.3298C62.8698 73.259 62.7352 73.221 62.5977 73.2198C62.5053 73.2185 62.4135 73.2355 62.3277 73.2698C62.2419 73.3041 62.1637 73.3551 62.0977 73.4198C61.9643 73.5521 61.8888 73.7319 61.8877 73.9198C61.8909 74.0584 61.9324 74.1934 62.0077 74.3098C62.0849 74.4275 62.1967 74.5183 62.3277 74.5698C62.4581 74.6093 62.5973 74.6093 62.7277 74.5698C62.8647 74.546 62.9907 74.4795 63.0877 74.3798C63.1862 74.2805 63.2554 74.1559 63.2877 74.0198C63.3155 73.8821 63.3019 73.7392 63.2485 73.6093C63.1951 73.4793 63.1043 73.3681 62.9877 73.2898V73.3298Z" fill="#FFB2C6"/>
          <Path d="M10.6477 90.4497C10.5409 90.3795 10.4171 90.3394 10.2894 90.3337C10.1617 90.328 10.0348 90.3569 9.92213 90.4173C9.80947 90.4778 9.71522 90.5675 9.64932 90.677C9.58342 90.7866 9.54832 90.9119 9.54773 91.0397C9.5475 91.1788 9.58933 91.3148 9.66773 91.4297C9.75051 91.5422 9.86066 91.6317 9.98773 91.6897C10.1188 91.7245 10.2567 91.7245 10.3877 91.6897C10.5246 91.6595 10.6498 91.59 10.7477 91.4897C10.85 91.3933 10.9199 91.2675 10.9477 91.1297C10.982 90.9986 10.982 90.8608 10.9477 90.7297C10.8731 90.6125 10.7698 90.5161 10.6477 90.4497Z" fill="#F74945"/>
          <Path d="M123.128 44.5802C122.995 44.4475 122.815 44.373 122.628 44.373C122.44 44.373 122.26 44.4475 122.128 44.5802C121.995 44.7128 121.921 44.8926 121.921 45.0802C121.921 45.2677 121.995 45.4475 122.128 45.5802C122.198 45.6996 122.308 45.7913 122.438 45.8402C122.571 45.8851 122.715 45.8851 122.848 45.8402C122.985 45.8184 123.112 45.7516 123.208 45.6502C123.305 45.5516 123.371 45.4263 123.398 45.2902C123.443 45.1572 123.443 45.0131 123.398 44.8802C123.339 44.7558 123.245 44.6515 123.128 44.5802Z" fill="#FFB2C6"/>
          <Path d="M179.828 36.0595C179.713 35.9811 179.577 35.9393 179.438 35.9395C179.345 35.9382 179.253 35.9552 179.168 35.9895C179.082 36.0238 179.004 36.0748 178.938 36.1395C178.804 36.2718 178.729 36.4516 178.728 36.6395C178.731 36.7781 178.772 36.9131 178.848 37.0295C178.925 37.1472 179.037 37.2381 179.168 37.2895C179.298 37.329 179.437 37.329 179.568 37.2895C179.707 37.2634 179.835 37.1974 179.938 37.0995C180.03 36.9969 180.095 36.8733 180.128 36.7395C180.163 36.6051 180.163 36.4639 180.128 36.3295C180.055 36.2128 179.951 36.1191 179.828 36.0595Z" fill="#3D5CFF"/>
          <Path d="M102.728 49.9996C102.759 49.9129 102.776 49.8217 102.778 49.7296C102.778 49.5874 102.736 49.4482 102.658 49.3296C102.581 49.2176 102.473 49.1307 102.348 49.0796C102.215 49.0347 102.071 49.0347 101.938 49.0796C101.801 49.1054 101.676 49.1716 101.578 49.2697C101.48 49.3678 101.413 49.4933 101.388 49.6296C101.343 49.7626 101.343 49.9066 101.388 50.0396C101.442 50.1663 101.532 50.2741 101.648 50.3496C101.762 50.4292 101.898 50.4711 102.038 50.4696C102.13 50.4675 102.221 50.4506 102.308 50.4196C102.392 50.3791 102.47 50.325 102.538 50.2596C102.617 50.1857 102.681 50.0975 102.728 49.9996Z" fill="#7BC8FF"/>
          <Path d="M69.9877 88.9995C69.8547 88.9546 69.7106 88.9546 69.5777 88.9995C69.4413 89.0253 69.3159 89.0915 69.2178 89.1897C69.1197 89.2878 69.0534 89.4132 69.0277 89.5495C68.9827 89.6825 68.9827 89.8266 69.0277 89.9595C69.0766 90.0894 69.1683 90.1988 69.2877 90.2695C69.402 90.3491 69.5384 90.3911 69.6777 90.3895C69.7687 90.3918 69.8593 90.3752 69.9436 90.3408C70.0279 90.3064 70.1042 90.2549 70.1677 90.1895C70.2331 90.122 70.2871 90.0443 70.3277 89.9595C70.3419 89.8701 70.3419 89.779 70.3277 89.6895C70.3292 89.5502 70.2873 89.4139 70.2077 89.2995C70.1627 89.1815 70.0867 89.0779 69.9877 88.9995Z" fill="#7BC8FF"/>
          <Path d="M164.728 49.9998C164.842 50.0793 164.978 50.1213 165.118 50.1198C165.302 50.1161 165.478 50.0408 165.608 49.9098C165.676 49.8457 165.729 49.7681 165.766 49.682C165.802 49.5959 165.819 49.5031 165.818 49.4098C165.818 49.2706 165.776 49.1347 165.698 49.0198C165.616 48.9097 165.51 48.8205 165.388 48.7598C165.253 48.7246 165.112 48.7246 164.978 48.7598C164.841 48.79 164.716 48.8595 164.618 48.9598C164.514 49.054 164.447 49.1813 164.428 49.3198C164.383 49.4494 164.383 49.5901 164.428 49.7198C164.496 49.8418 164.601 49.9396 164.728 49.9998Z" fill="#7BC8FF"/>
          <Path d="M130.888 47.7997C131.003 47.8781 131.139 47.9199 131.278 47.9197C131.37 47.921 131.462 47.904 131.548 47.8697C131.633 47.8353 131.712 47.7844 131.778 47.7197C131.843 47.6546 131.895 47.5761 131.928 47.4897C131.966 47.4049 131.987 47.3129 131.988 47.2197C131.989 47.0803 131.947 46.944 131.868 46.8297C131.79 46.712 131.679 46.6211 131.548 46.5697C131.417 46.5302 131.278 46.5302 131.148 46.5697C131.011 46.5959 130.886 46.6621 130.788 46.7597C130.687 46.8576 130.618 46.9827 130.588 47.1197C130.552 47.2541 130.552 47.3953 130.588 47.5297C130.66 47.6464 130.764 47.7401 130.888 47.7997Z" fill="#7BC8FF"/>
          <Path d="M37.9877 75C37.8533 74.9648 37.7121 74.9648 37.5777 75C37.4415 75.0323 37.317 75.1015 37.2177 75.2C37.118 75.297 37.0515 75.423 37.0277 75.56C36.9882 75.6904 36.9882 75.8296 37.0277 75.96C37.0791 76.091 37.17 76.2028 37.2877 76.28C37.402 76.3596 37.5384 76.4015 37.6777 76.4C37.8656 76.3989 38.0454 76.3234 38.1777 76.19C38.2424 76.124 38.2933 76.0458 38.3277 75.96C38.362 75.8742 38.379 75.7824 38.3777 75.69C38.3779 75.5509 38.3361 75.4149 38.2577 75.3C38.1981 75.1763 38.1044 75.0722 37.9877 75Z" fill="#7BC8FF"/>
          <Path d="M83.1777 82.9097C83.0447 82.8647 82.9006 82.8647 82.7677 82.9097C82.6309 82.9342 82.5051 83.0006 82.4077 83.0997C82.3136 83.2008 82.248 83.325 82.2177 83.4597C82.1779 83.5935 82.1779 83.7359 82.2177 83.8697C82.2719 83.9964 82.3624 84.1042 82.4777 84.1797C82.5926 84.2581 82.7285 84.2999 82.8677 84.2997C82.961 84.3015 83.0538 84.2837 83.1399 84.2475C83.226 84.2114 83.3036 84.1576 83.3677 84.0897C83.4959 83.9588 83.5677 83.7829 83.5677 83.5997C83.568 83.462 83.5299 83.3269 83.4577 83.2097C83.3975 83.0832 83.2997 82.9785 83.1777 82.9097Z" fill="#FF5653"/>
          <Path d="M82.9877 59.0002C82.7842 58.9203 82.5624 58.8995 82.3477 58.9402C82.1356 58.9829 81.9408 59.0873 81.7877 59.2402C81.6335 59.3978 81.5262 59.5952 81.4777 59.8102C81.4354 60.0257 81.4598 60.2489 81.5477 60.4502C81.6279 60.6532 81.7673 60.8273 81.9477 60.9502C82.1329 61.0682 82.3481 61.1306 82.5677 61.1302C82.8568 61.1172 83.1294 60.9918 83.3274 60.7807C83.5254 60.5696 83.6332 60.2896 83.6277 60.0002C83.6254 59.7903 83.5642 59.5852 83.4511 59.4084C83.3379 59.2316 83.1773 59.0902 82.9877 59.0002Z" fill="#7BC8FF"/>
          <Path d="M184.288 37.9201C184.089 37.7739 183.843 37.7063 183.598 37.7303C183.352 37.7543 183.124 37.8682 182.958 38.0501C182.859 38.1486 182.781 38.2656 182.728 38.3943C182.675 38.523 182.648 38.6609 182.648 38.8001C182.648 39.0088 182.707 39.2131 182.818 39.3901C182.936 39.5641 183.103 39.6997 183.298 39.7801C183.491 39.8597 183.703 39.8806 183.908 39.8401C184.114 39.8023 184.303 39.7009 184.448 39.5501C184.595 39.4026 184.696 39.2147 184.738 39.0101C184.778 38.802 184.757 38.5867 184.678 38.3901C184.6 38.1966 184.464 38.0323 184.288 37.9201Z" fill="#FF5653"/>
          <Path d="M49.1077 70.4498C48.7093 70.1891 48.2437 70.0501 47.7677 70.0498C47.453 70.0498 47.1414 70.1119 46.8507 70.2327C46.5601 70.3534 46.2962 70.5304 46.0741 70.7533C45.8521 70.9763 45.6762 71.241 45.5567 71.5321C45.4372 71.8232 45.3763 72.1351 45.3777 72.4498C45.3681 72.9241 45.508 73.3894 45.7777 73.7798C46.0348 74.179 46.4083 74.4896 46.8477 74.6698C47.2876 74.8504 47.7706 74.899 48.2377 74.8098C48.7048 74.7189 49.1336 74.4888 49.4677 74.1498C49.8087 73.8173 50.0391 73.3878 50.1277 72.9198C50.2197 72.4554 50.1741 71.9743 49.9964 71.5355C49.8188 71.0967 49.5168 70.7194 49.1277 70.4498H49.1077Z" fill="#FFB2C6"/>
          <Path d="M183.138 31.7502C183.198 31.8302 183.238 31.9102 183.298 31.9802C184.062 32.9065 185.086 33.5823 186.238 33.9202C187.389 34.2623 188.615 34.2548 189.762 33.8987C190.908 33.5427 191.923 32.854 192.678 31.9202C193.251 31.2105 193.654 30.3794 193.858 29.4902C192.119 30.0808 190.345 30.5651 188.548 30.9402C186.764 31.3259 184.957 31.5964 183.138 31.7502Z" fill="#F74945"/>
          <Path d="M192.628 24.2197H192.618L192.628 24.2297V24.2197Z" fill="#F74945"/>
          <Path d="M193.898 26.8704C194.02 27.4587 194.054 28.0621 193.998 28.6604C193.976 28.9407 193.929 29.2185 193.858 29.4904C197.508 28.2304 199.858 26.7404 199.648 25.6404C199.438 24.5404 196.648 24.1404 192.818 24.4604C192.818 24.5304 192.938 24.5904 192.988 24.6604C193.436 25.3286 193.746 26.0802 193.898 26.8704Z" fill="#3D5CFF"/>
          <Path d="M183.138 31.75C182.615 31.0594 182.247 30.2649 182.058 29.42V29.36C181.882 28.5852 181.858 27.7838 181.988 27C182.002 26.9154 182.022 26.8318 182.048 26.75C178.408 28.01 176.048 29.49 176.278 30.59C176.508 31.69 179.278 32.07 183.138 31.75Z" fill="#3D5CFF"/>
          <Path d="M193.898 26.8701C194.038 27.6601 191.528 28.8701 188.268 29.5501C185.008 30.2301 182.368 30.1501 182.058 29.4201C182.247 30.265 182.615 31.0595 183.138 31.7501C184.956 31.5963 186.764 31.3258 188.548 30.9401C190.345 30.5649 192.119 30.0807 193.858 29.4901C193.929 29.2183 193.976 28.9405 193.998 28.6601C194.054 28.0618 194.02 27.4584 193.898 26.8701Z" fill="#3D5CFF"/>
          <Path d="M182.598 25.2797C183.051 24.3899 183.72 23.6275 184.543 23.0616C185.366 22.4957 186.317 22.1441 187.31 22.0388C188.303 21.9336 189.307 22.0779 190.231 22.4587C191.154 22.8395 191.967 23.4448 192.598 24.2197C192.227 23.7505 191.789 23.3393 191.298 22.9997C190.627 22.5573 189.876 22.2515 189.088 22.0997C188.299 21.9446 187.487 21.9446 186.698 22.0997C185.913 22.2656 185.169 22.5851 184.508 23.0399C183.847 23.4947 183.283 24.0758 182.848 24.7497C182.459 25.3619 182.185 26.0395 182.038 26.7497C182.156 26.2362 182.344 25.7415 182.598 25.2797Z" fill="#F74945"/>
          <Path d="M192.818 24.4605L192.628 24.2305C192.688 24.3005 192.728 24.3805 192.788 24.4605H192.818Z" fill="#F74945"/>
          <Path d="M188.518 22.0601C187.323 21.9492 186.122 22.1961 185.068 22.7695C184.014 23.3429 183.154 24.2168 182.598 25.2801C182.361 25.7314 182.186 26.2123 182.078 26.7101C183.808 26.1275 185.571 25.6466 187.358 25.2701C189.148 24.8843 190.962 24.6138 192.788 24.4601C192.728 24.3801 192.688 24.3001 192.628 24.2301C192.122 23.6162 191.498 23.1091 190.795 22.7383C190.091 22.3674 189.32 22.1403 188.528 22.0701L188.518 22.0601Z" fill="#F74945"/>
          <Path d="M181.988 29.3602V29.4202C181.932 29.1965 181.892 28.9694 181.868 28.7402C181.797 28.0705 181.845 27.3937 182.008 26.7402C181.995 26.8263 181.988 26.9132 181.988 27.0002C181.835 27.7795 181.835 28.5809 181.988 29.3602Z" fill="#F74945"/>
          <Path d="M193.758 26.3C193.758 26.49 193.858 26.68 193.898 26.87C193.746 26.0797 193.436 25.3281 192.988 24.66C192.938 24.59 192.868 24.53 192.818 24.46C193.233 25.0157 193.551 25.6379 193.758 26.3Z" fill="#F74945"/>
          <Path d="M188.268 29.55C191.528 28.86 194.038 27.66 193.898 26.87C193.898 26.68 193.808 26.49 193.758 26.3C193.532 25.6338 193.194 25.0114 192.758 24.46C190.932 24.6137 189.118 24.8842 187.328 25.27C185.541 25.6465 183.778 26.1274 182.048 26.71C181.885 27.3634 181.837 28.0402 181.908 28.71C181.932 28.9391 181.972 29.1663 182.028 29.39C182.368 30.15 185.078 30.22 188.268 29.55Z" fill="#F74945"/>
          <Path d="M77.6877 51.7095C78.0087 51.8218 78.3488 51.8698 78.6884 51.8507C79.028 51.8315 79.3606 51.7457 79.667 51.5981C79.9734 51.4504 80.2478 51.2438 80.4744 50.9902C80.701 50.7365 80.8754 50.4406 80.9877 50.1195C81.1525 49.5989 81.1525 49.0401 80.9877 48.5195C79.2777 48.9695 77.6177 49.4495 76.0477 49.9695C76.1619 50.3696 76.3704 50.7365 76.6558 51.0392C76.9412 51.342 77.295 51.5719 77.6877 51.7095Z" fill="#3D5CFF"/>
          <Path d="M144.278 60.7197L140.778 61.6297L144.278 60.7197Z" fill="#F74945"/>
          <Path d="M144.378 60.09C144.374 59.7412 144.284 59.3987 144.117 59.0928C143.949 58.787 143.708 58.5272 143.416 58.3366C143.124 58.146 142.789 58.0305 142.442 58.0002C142.094 57.9699 141.745 58.0259 141.424 58.163C141.103 58.3002 140.821 58.5144 140.603 58.7867C140.385 59.0589 140.238 59.3808 140.174 59.7237C140.11 60.0666 140.131 60.42 140.237 60.7525C140.342 61.085 140.528 61.3864 140.778 61.63L144.278 60.72C144.342 60.516 144.375 60.3037 144.378 60.09Z" fill="#F74945"/>
          <Path d="M150.138 47.33C153.848 48.08 154.518 51.84 154.788 55.54C154.781 55.5696 154.781 55.6004 154.788 55.63C154.817 55.6376 154.848 55.6376 154.878 55.63C154.91 55.6395 154.945 55.6395 154.978 55.63C154.989 55.6012 154.989 55.5689 154.978 55.54C155.058 52.22 155.868 48.12 159.638 47.33C159.66 47.323 159.68 47.3091 159.694 47.2902C159.707 47.2713 159.715 47.2485 159.715 47.225C159.715 47.2016 159.707 47.1787 159.694 47.1599C159.68 47.141 159.66 47.127 159.638 47.12C156.158 46.73 155.188 42.85 154.978 38.91C154.985 38.8805 154.985 38.8495 154.978 38.82C154.945 38.81 154.91 38.81 154.878 38.82C154.849 38.8101 154.817 38.8101 154.788 38.82C154.781 38.8496 154.781 38.8804 154.788 38.91C154.598 42.38 153.968 46.27 150.138 47.12C150.118 47.1132 150.097 47.1132 150.078 47.12C150.072 47.143 150.072 47.1671 150.078 47.19C150.073 47.2098 150.073 47.2303 150.078 47.25C150.079 47.2678 150.085 47.2849 150.096 47.2991C150.106 47.3134 150.121 47.3241 150.138 47.33Z" fill="#5F70FA"/>
          <Path d="M105.248 55.5797C105.24 55.5761 105.231 55.5742 105.223 55.5742C105.214 55.5742 105.206 55.5761 105.198 55.5797C105.088 57.4897 104.748 59.5797 102.638 60.0797C104.638 60.4897 105.048 62.5497 105.198 64.5797C105.206 64.5833 105.214 64.5851 105.223 64.5851C105.231 64.5851 105.24 64.5833 105.248 64.5797C105.248 62.7497 105.728 60.5097 107.798 60.0797C107.858 60.0797 107.858 59.9597 107.798 59.9597C105.888 59.8697 105.358 57.7397 105.248 55.5797Z" fill="#3D5CFF"/>
          <Path d="M70.6677 68.1504C70.4052 68.1524 70.1486 68.2287 69.9277 68.3704C69.7092 68.5182 69.5389 68.7266 69.4376 68.9701C69.3363 69.2136 69.3085 69.4814 69.3577 69.7404C69.4134 70.0008 69.5417 70.24 69.7277 70.4304C69.9124 70.6168 70.1497 70.7424 70.4077 70.7904C70.6658 70.8447 70.9343 70.8203 71.1785 70.7205C71.4227 70.6207 71.6314 70.45 71.7777 70.2304C71.9147 70.0298 71.9941 69.7954 72.0074 69.5528C72.0206 69.3102 71.9671 69.0686 71.8527 68.8542C71.7383 68.6398 71.5674 68.4609 71.3585 68.3368C71.1495 68.2128 70.9106 68.1483 70.6677 68.1504Z" fill="#FF5653"/>
          <Path d="M56.8077 89.4201C56.5436 89.421 56.2858 89.5012 56.0677 89.6501C55.8454 89.7937 55.674 90.0036 55.5777 90.2501C55.4765 90.4935 55.4487 90.7612 55.4977 91.0201C55.5617 91.2683 55.694 91.4937 55.8796 91.6704C56.0652 91.8472 56.2967 91.9684 56.5477 92.0201C56.8067 92.0692 57.0744 92.0414 57.3177 91.9401C57.5626 91.841 57.7717 91.6702 57.9177 91.4501C58.0679 91.2332 58.145 90.9739 58.1377 90.7101C58.1382 90.5354 58.1039 90.3624 58.037 90.201C57.97 90.0397 57.8717 89.8932 57.7477 89.7701C57.6224 89.652 57.4746 89.5601 57.3131 89.5C57.1517 89.4399 56.9798 89.4127 56.8077 89.4201Z" fill="#3D5CFF"/>
          <Path d="M51.8277 64.2301C51.7054 64.1064 51.5485 64.0227 51.3777 63.9901C51.2054 63.9553 51.0267 63.9729 50.8645 64.0406C50.7023 64.1083 50.5641 64.2231 50.4677 64.3701C50.3679 64.5138 50.3154 64.6851 50.3177 64.8601C50.3175 64.977 50.3404 65.0928 50.385 65.2009C50.4296 65.309 50.4951 65.4073 50.5777 65.4901C50.7467 65.6542 50.9722 65.7472 51.2077 65.7501C51.3813 65.7435 51.5502 65.6918 51.6977 65.6001C51.8438 65.5011 51.9583 65.3623 52.0277 65.2001C52.0901 65.0342 52.1074 64.8548 52.0777 64.6801C52.0411 64.5085 51.954 64.3518 51.8277 64.2301Z" fill="#7BC8FF"/>
          <Path d="M94.2076 68.8398C94.2076 68.8398 94.1476 68.7598 94.0776 68.7598C94.0076 68.7598 93.9476 68.7598 93.9476 68.8398C93.7476 71.2798 92.8276 73.6898 89.5376 73.9298C89.4376 73.9298 89.4376 74.0398 89.5376 74.0598C93.1076 74.5598 93.8676 77.0598 93.9476 79.1598C93.9476 79.1598 94.0076 79.2298 94.0776 79.2298C94.1476 79.2298 94.1976 79.2298 94.2076 79.1598C94.4576 76.8598 95.0976 74.5298 98.6076 74.0598C98.7176 74.0598 98.7176 73.9498 98.6076 73.9298C94.9876 73.3998 94.3776 70.9998 94.2076 68.8398Z" fill="#5F70FA"/>
          <Path d="M19.8777 81.1204C19.7928 81.0406 19.6947 80.9763 19.5877 80.9304C19.4797 80.8861 19.3644 80.8624 19.2477 80.8604C19.0741 80.8669 18.9052 80.9186 18.7577 81.0104C18.6116 81.1093 18.497 81.2481 18.4277 81.4104C18.3652 81.5762 18.348 81.7556 18.3777 81.9304C18.4143 82.1019 18.5013 82.2586 18.6277 82.3803C18.75 82.504 18.9069 82.5877 19.0777 82.6204C19.2486 82.6593 19.4276 82.6418 19.5877 82.5704C19.7516 82.5055 19.892 82.3924 19.9903 82.2459C20.0885 82.0995 20.1399 81.9267 20.1377 81.7504C20.1386 81.6334 20.1147 81.5175 20.0677 81.4104C20.0235 81.3024 19.959 81.204 19.8777 81.1204Z" fill="#FFB2C6"/>
          <Path d="M31.1477 81.47C30.4883 81.9161 29.9739 82.5452 29.6677 83.28C29.3583 84.0194 29.2782 84.8346 29.4377 85.62C29.4377 85.62 29.4377 85.68 29.4377 85.71C32.0777 84.24 34.4377 82.9 36.1977 81.96C35.5412 81.302 34.676 80.8931 33.7507 80.8037C32.8255 80.7143 31.898 80.9499 31.1277 81.47H31.1477Z" fill="#5F70FA"/>
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDE6EA', // Задайте свой цвет фона
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoTextContainer: {
    position: 'absolute',
  },
  text: {
    fontFamily: 'Alice',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 34,
    lineHeight: 34,
    textAlign: 'center',
    letterSpacing: -0.408,
    color: '#240E54',
  },
  svgContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloud: {
    position: 'absolute',
    bottom: '-1.5%', // Укажите позиции для SVG1
    left: 0,
  },
  leftHand: {
    position: 'absolute',
    bottom: '14%', // Укажите позиции для SVG2
    left: 0,
  },
  rightHand: {
    position: 'absolute',
    bottom: '25%', // Укажите позиции для SVG3
    right: 0,
  },
});

export default SplashScreen;