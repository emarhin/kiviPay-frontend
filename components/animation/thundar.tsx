import React from "react";

interface ThunderAnimationProps {
  size?: number;
  color?: string;
  animated?: boolean;
  speed?: number;
}

const ThunderAnimation: React.FC<ThunderAnimationProps> = ({
  size = 120,
  color = "#faed60ff", // yellowish color
  animated = true,
  speed = 1.5,
}) => {
  const animationDuration = `${2 / speed}s`;
  const pulseDuration = `${1.5 / speed}s`;
  const sparkleDuration = `${0.8 / speed}s`;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Main Thunderbolt */}
        <g className={animated ? "animate-thunder" : ""}>
          <path
            d="M60 20L45 50H55L40 80H65L55 100L75 70H65L80 40H60V20Z"
            fill={color}
            fillOpacity="0.9"
          >
            {animated && (
              <animate
                attributeName="fill-opacity"
                values="0.9;0.6;0.9;0.4;0.9"
                dur={animationDuration}
                repeatCount="indefinite"
              />
            )}
          </path>
        </g>

        {/* Inner Glow */}
        {animated && (
          <g>
            <path
              d="M60 25L47 50H55L43 75H62L55 95L70 70H65L75 45H60V25Z"
              fill="#ffffff"
              fillOpacity="0.3"
            >
              <animate
                attributeName="fill-opacity"
                values="0.3;0.7;0.3;0.9;0.3"
                dur={pulseDuration}
                repeatCount="indefinite"
              />
            </path>
          </g>
        )}

        {/* Electric Spark Effects */}
        {animated && (
          <>
            {/* Top Spark */}
            <path d="M60 15L58 25L62 20Z" fill="#faed60ff" opacity="0">
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur={sparkleDuration}
                repeatCount="indefinite"
                begin="0s"
              />
            </path>

            {/* Middle Spark */}
            <path d="M50 55L48 60L52 58Z" fill="#faed60ff" opacity="0">
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur={sparkleDuration}
                repeatCount="indefinite"
                begin="0.2s"
              />
            </path>

            {/* Bottom Spark */}
            <path d="M70 85L68 90L72 88Z" fill="#faed60ff" opacity="0">
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur={sparkleDuration}
                repeatCount="indefinite"
                begin="0.4s"
              />
            </path>

            {/* Energy Particles */}
            <circle cx="60" cy="35" r="2" fill="#faed60ff" opacity="0">
              <animate
                attributeName="opacity"
                values="0;0.8;0"
                dur={`${0.5 / speed}s`}
                repeatCount="indefinite"
                begin="0.1s"
              />
              <animate
                attributeName="cy"
                from="35"
                to="40"
                dur={`${0.8 / speed}s`}
                repeatCount="indefinite"
              />
            </circle>

            <circle cx="65" cy="60" r="1.5" fill="#faed60ff" opacity="0">
              <animate
                attributeName="opacity"
                values="0;0.7;0"
                dur={`${0.6 / speed}s`}
                repeatCount="indefinite"
                begin="0.3s"
              />
              <animate
                attributeName="cy"
                from="60"
                to="55"
                dur={`${0.7 / speed}s`}
                repeatCount="indefinite"
              />
            </circle>
          </>
        )}
      </svg>

      {/* Glow Effect Container */}
      {animated && (
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute rounded-full"
            style={{
              width: size * 0.8,
              height: size * 0.8,
              top: "10%",
              left: "10%",
              background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
              animation: `pulse ${pulseDuration} infinite alternate`,
            }}
          />

          <div
            className="absolute rounded-full"
            style={{
              width: size * 0.6,
              height: size * 0.6,
              top: "20%",
              left: "20%",
              background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
              animation: `pulse ${pulseDuration} infinite alternate-reverse`,
              animationDelay: "0.2s",
            }}
          />
        </div>
      )}

      {/* Add CSS animations to global or component styles */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 0.3;
            transform: scale(0.95);
          }
          100% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }

        @keyframes thunder {
          0% {
            filter: drop-shadow(0 0 5px ${color}80);
          }
          50% {
            filter: drop-shadow(0 0 15px ${color}CC)
              drop-shadow(0 0 25px ${color}40);
          }
          100% {
            filter: drop-shadow(0 0 5px ${color}80);
          }
        }

        .animate-thunder {
          animation: thunder ${animationDuration} infinite;
        }
      `}</style>
    </div>
  );
};

// Simple Static Thunder Icon (for buttons, etc.)
export const ThunderIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13 2L5 14H11L9 22L19 10H13L15 2Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </svg>
  );
};

// Mini Loading Thunder Animation
export const LoadingThunder: React.FC = () => {
  return (
    <div className="relative w-8 h-8">
      <div className="absolute inset-0 animate-ping">
        <ThunderIcon size={32} className="text-blue-500 opacity-20" />
      </div>
      <ThunderIcon size={32} className="text-blue-600 relative" />
    </div>
  );
};

// Full Screen Thunder Animation (for loading states)
export const FullScreenThunderAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black z-50">
      <div className="text-center">
        <ThunderAnimation
          size={200}
          color="#60A5FA"
          animated={true}
          speed={1}
        />
        <div className="mt-8 text-white">
          <div className="text-xl font-bold mb-2 animate-pulse">Thundarpay</div>
          <div className="text-sm text-blue-300">Processing...</div>
        </div>
      </div>
    </div>
  );
};

export default ThunderAnimation;
