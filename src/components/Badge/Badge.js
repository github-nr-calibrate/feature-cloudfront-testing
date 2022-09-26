import React from 'react';
import PropTypes from 'types';
import styled from 'styled-components';
import { Box } from 'components/Layout';
import { MQAbove } from 'styles/mediaQueries';
import { Animation } from 'components/Animation';

function Badge({
  mt = '0',
  mb = '0',
  center,
  large,
}) {
  const ml = center ? 'auto' : '0';
  const mr = center ? 'auto' : '0';

  return (
    <BadgeBox mt={mt} mr={mr} mb={mb} ml={ml} $large={large}>
      <Animation name="fadeIn">
        <svg viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Animation name="rotate">
            <path d="m3.29 26.456.745-1.96c.426-1.127 1.11-1.629 2.108-1.254l.03.011c.543.207.88.613.838 1.308.442-.682.98-.88 1.71-.604l.031.011c1.02.387 1.276 1.255.823 2.458l-.799 2.104-5.482-2.073h-.003Zm5.508-.184c.257-.683.072-1.11-.498-1.327l-.03-.01c-.567-.216-.969-.01-1.254.742l-.349.919 1.757.666.377-.989h-.003Zm-2.5-.777c.253-.673.11-1.026-.45-1.24l-.03-.01c-.52-.198-.857.018-1.103.668l-.312.826 1.581.596.322-.841h-.008ZM6.373 19.54l.729-1.222 6.024 1.332-.578.97-1.486-.34-1.143 1.922 1.012 1.135-.524.88-4.034-4.676Zm2.993 2.036.885-1.485-2.78-.65 1.895 2.135ZM11.019 17.648l-.05-.044c-1.329-1.157-1.46-2.88-.386-4.105.885-1.013 2.076-1.355 3.201-.55l-.727.835c-.668-.418-1.258-.354-1.812.28-.68.78-.517 1.812.475 2.672l.049.044c.994.865 1.998.902 2.71.089.534-.612.601-1.313.052-1.941l.7-.802c.95 1.056.832 2.276-.085 3.326-1.209 1.382-2.763 1.384-4.125.2l-.002-.004ZM13.751 10.374l.856-.675 1.649 2.081.11-3.48.919-.725-.165 3.699 3.901.824-1.009.798-3.467-.749 1.698 2.144-.855.676-3.637-4.593ZM18.756 6.679l3.204-1.775.418.752-2.253 1.246.78 1.405 1.807-1 .398.714-1.807 1 .83 1.498 2.372-1.314.418.752-3.326 1.841-2.844-5.12.003.001ZM23.755 4.077l1.68-.589c1.925-.675 3.247.098 3.812 1.706l.025.07c.564 1.607.027 3.079-1.914 3.756l-1.666.582-1.937-5.525ZM27.04 8.22c1.238-.43 1.583-1.35 1.158-2.573l-.024-.062c-.418-1.19-1.21-1.718-2.512-1.265l-.596.209 1.367 3.9.604-.21.003.001ZM32.505 1.644l2.088-.194c1.201-.112 1.952.278 2.052 1.34l.003.032c.053.577-.163 1.06-.805 1.323.809.097 1.223.497 1.293 1.27l.004.03c.1 1.086-.566 1.696-1.85 1.817l-2.244.207-.544-5.826.003.001ZM35.091 6.5c.728-.067 1.032-.424.973-1.027l-.004-.031c-.055-.601-.42-.874-1.218-.8l-.978.092.175 1.866 1.051-.096.001-.004Zm-.395-2.586c.72-.067.971-.352.915-.95l-.004-.03c-.053-.556-.392-.762-1.084-.697l-.88.081.157 1.68.9-.083-.004-.001ZM39.564 4.668l-1.706-3.443 1.202.085 1.15 2.51 1.451-2.327 1.063.073-2.063 3.187-.176 2.524-1.096-.077.175-2.532ZM45.106 6.104l1.002.31c-.105.585-.024 1.123.924 1.417.62.192 1.162-.016 1.323-.533.16-.518-.037-.791-.899-1.22-1.283-.594-1.792-1.196-1.466-2.244.283-.916 1.28-1.36 2.446-1.001 1.206.373 1.758 1.142 1.533 2.248l-.954-.295c.079-.618-.178-.973-.822-1.17-.634-.198-1.058.007-1.191.436-.141.452-.024.739.905 1.18 1.259.589 1.823 1.173 1.48 2.29-.302.97-1.358 1.473-2.595 1.092-1.527-.471-1.933-1.43-1.686-2.51ZM50.758 6.791l.031-.057c.811-1.563 2.456-2.096 3.902-1.343 1.196.618 1.81 1.692 1.29 2.974l-.983-.51c.25-.746.05-1.304-.702-1.69-.917-.475-1.884-.073-2.49 1.091l-.03.057c-.609 1.171-.408 2.152.554 2.65.722.373 1.419.275 1.903-.407l.946.489c-.801 1.17-2.02 1.344-3.256.703-1.63-.844-2-2.357-1.17-3.955l.005-.002ZM58.313 7.667l.895.634-3.398 4.773-.895-.634 3.398-4.773ZM60.811 9.505l2.714 2.458-.578.638-1.906-1.727-1.08 1.19 1.529 1.385-.552.606-1.528-1.386-1.152 1.266 2.01 1.82-.578.638-2.817-2.551 3.938-4.337ZM64.92 13.404l.8 1.03-1.84 4.542 3.35-2.592.608.78-4.632 3.586-.693-.894 1.933-4.834-3.55 2.748-.608-.78 4.633-3.586ZM66.285 20.192l.06-.028c1.576-.788 3.218-.257 3.948 1.202.604 1.2.466 2.43-.705 3.165l-.497-.988c.642-.456.806-1.025.426-1.779-.463-.922-1.483-1.162-2.655-.575l-.059.028c-1.181.59-1.595 1.502-1.11 2.47.364.725.988 1.055 1.779.787l.476.95c-1.338.478-2.424-.098-3.049-1.342-.822-1.639-.233-3.077 1.377-3.886l.01-.004ZM71.96 25.433l1.053 3.506-.826.248-.738-2.462-1.54.46.593 1.977-.787.236-.592-1.977-1.642.492.78 2.598-.825.249-1.092-3.641 5.618-1.681-.002-.005ZM72.716 47.041l-.67 1.988c-.385 1.14-1.045 1.67-2.056 1.33l-.03-.01c-.552-.183-.903-.58-.888-1.273-.418.699-.95.919-1.686.67l-.03-.011c-1.034-.347-1.324-1.204-.915-2.423l.718-2.132 5.556 1.865.001-.004Zm-5.493.393c-.234.691-.028 1.111.546 1.307l.03.01c.575.192.97-.027 1.226-.79l.315-.931-1.781-.599-.336 1.003Zm2.528.686c-.23.68-.07 1.028.498 1.221l.03.01c.528.176.857-.048 1.076-.71l.282-.837-1.603-.536-.287.854.004-.002ZM69.907 54.07l-.681 1.25-6.075-1.093.541-.995 1.5.281 1.067-1.964-1.057-1.095.49-.9 4.217 4.512-.002.003Zm-3.072-1.917-.825 1.517 2.803.541-1.978-2.058ZM65.34 56.14l.05.04c1.374 1.105 1.569 2.817.548 4.087-.844 1.046-2.021 1.434-3.174.676l.694-.861c.685.393 1.269.304 1.8-.35.647-.802.444-1.83-.577-2.65l-.05-.04c-1.027-.828-2.03-.824-2.711.02-.508.632-.55 1.334.023 1.94l-.669.83c-.99-1.015-.919-2.24-.047-3.325 1.153-1.428 2.707-1.49 4.111-.364l.002-.003ZM62.896 63.512l-.829.708-1.729-2.016.027 3.48-.89.761.018-3.701-3.93-.668.976-.836 3.494.61-1.783-2.075.83-.708 3.812 4.447.004-.002ZM58.042 67.404l-3.134 1.898-.447-.736 2.2-1.333-.833-1.37-1.767 1.07-.425-.7 1.767-1.072-.888-1.462-2.32 1.404-.447-.735 3.25-1.97 3.04 5.005h.004ZM53.143 70.204l-1.656.65c-1.899.748-3.25.029-3.877-1.555l-.028-.07c-.626-1.585-.146-3.077 1.769-3.828l1.64-.647 2.149 5.449.003.001ZM49.7 66.189c-1.22.479-1.532 1.41-1.056 2.617l.024.062c.462 1.171 1.276 1.67 2.558 1.168l.588-.23-1.518-3.848-.594.236-.002-.005ZM44.499 72.968l-2.08.277c-1.195.16-1.963-.203-2.103-1.257l-.004-.031c-.077-.575.124-1.066.753-1.358-.813-.064-1.241-.446-1.346-1.216l-.004-.031c-.144-1.078.5-1.72 1.773-1.888l2.235-.298.772 5.8.004.002Zm-2.275-2.182c-.714.095-.955.391-.878.985l.004.031c.073.551.42.745 1.11.653l.878-.116-.224-1.673-.893.119.003.001Zm-.5-2.567c-.723.096-1.013.466-.935 1.067l.004.032c.078.601.453.855 1.25.751l.977-.13-.249-1.86-1.048.14ZM37.32 70.228l1.84 3.373-1.204-.037-1.245-2.46-1.359 2.382-1.066-.033 1.933-3.267.076-2.53 1.096.033-.075 2.538h.004ZM31.733 69.008l-1.016-.272c.08-.59-.02-1.125-.978-1.38-.625-.168-1.164.061-1.304.585-.14.525.068.79.949 1.185 1.305.544 1.835 1.128 1.554 2.188-.248.924-1.226 1.41-2.407 1.094-1.22-.325-1.801-1.074-1.622-2.189l.967.259c-.057.621.218.964.867 1.14.643.17 1.057-.049 1.173-.484.125-.458-.006-.738-.948-1.143-1.28-.54-1.87-1.103-1.565-2.233.264-.98 1.301-1.526 2.551-1.19 1.544.413 1.989 1.356 1.782 2.442l-.003-.002ZM26.055 68.54l-.028.058c-.75 1.592-2.372 2.19-3.848 1.498-1.216-.57-1.872-1.62-1.407-2.921l1.001.47c-.219.758.003 1.305.77 1.662.933.44 1.883-.002 2.443-1.187l.028-.058c.563-1.194.32-2.163-.659-2.623-.736-.343-1.427-.217-1.883.483l-.964-.45c.755-1.203 1.963-1.421 3.225-.832 1.664.78 2.09 2.276 1.324 3.904l-.002-.004ZM18.488 67.965l-.921-.601 3.2-4.903.922.601-3.2 4.903ZM15.9 66.22l-2.81-2.349.551-.658 1.975 1.653 1.032-1.229-1.583-1.326.525-.626 1.583 1.326 1.1-1.31-2.08-1.74.551-.659 2.917 2.44-3.764 4.484.003-.006ZM11.638 62.475l-.838-.998 1.664-4.608-3.248 2.719-.639-.758 4.494-3.76.726.865-1.749 4.902 3.445-2.88.637.762-4.493 3.76v-.004ZM10.013 55.75l-.057.032c-1.545.848-3.206.382-3.994-1.045-.649-1.177-.563-2.411.582-3.189l.535.967c-.621.483-.764 1.056-.357 1.796.5.905 1.526 1.105 2.676.474l.057-.033c1.156-.638 1.534-1.565 1.01-2.51-.391-.708-1.028-1.012-1.807-.713l-.513-.933c1.317-.527 2.426.004 3.098 1.223.887 1.605.354 3.067-1.225 3.936l-.005-.006ZM4.144 50.734 2.96 47.272l.813-.279.833 2.431 1.519-.52-.67-1.95.775-.267.67 1.951 1.623-.556-.881-2.561.813-.28 1.234 3.593-5.543 1.897v.003ZM71.953 38.163a1.07 1.07 0 0 0-2.016-.712 1.07 1.07 0 0 0 2.016.712ZM5.55 37.732a1.07 1.07 0 0 0-2.016-.712 1.07 1.07 0 0 0 2.016.712Z" fill="#8F67E9" />
          </Animation>
          <path d="M47.6 30H28.4l9.735 16.8L47.6 30Z" fill="#8F67E9" />
        </svg>
      </Animation>
    </BadgeBox>
  );
}

const BadgeBox = styled(Box)`
    --badge_size: 5rem;

    height: var(--badge_size);
    width: var(--badge_size);

    ${MQAbove.md` 
      --badge_size: ${({ $large }) => $large ? '7.5rem' : '6rem' };
    `}

    svg {
      height: 100%;
      width: 100%;

      path {
        fill: var(--emphasis-color, var(--color__lavender));
      }
    }
`;

Badge.propTypes = {
  mt: PropTypes.string,
  mb: PropTypes.string,
  center: PropTypes.bool,
  large: PropTypes.bool,
};

export default Badge;
