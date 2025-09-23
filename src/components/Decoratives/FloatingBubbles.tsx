import React from 'react';

import { motion } from 'motion/react';

import styles from './FloatingBubbles.module.css';

interface FloatingBubblesProps {
	className?: string;
	count?: number;
	color?: string;
	animated?: boolean;
}

const FloatingBubbles: React.FC<FloatingBubblesProps> = props => {
	const { className = '', count = 8, color = 'rgb(20 184 166)', animated = true } = props;

	const bubbleVariants = {
		hidden: { scale: 0, opacity: 0 },
		visible: (i: number) => ({
			scale: 1,
			opacity: [0.1, 0.3, 0.1],
			transition: {
				duration: 0.8,
				delay: i * 0.2,
				opacity: {
					duration: 4,
					repeat: Infinity,
					ease: 'easeInOut',
				},
			},
		}),
	};

	const floatingAnimation = (i: number) => ({
		x: [0, Math.random() * 40 - 20, 0],
		y: [0, Math.random() * 60 - 30, 0],
		transition: {
			duration: 8 + Math.random() * 4,
			repeat: Infinity,
			ease: 'easeInOut',
			delay: i * 0.5,
		},
	});

	const generateBubbles = () => {
		return Array.from({ length: count }, (_, i) => {
			const size = Math.random() * 60 + 20;
			const x = Math.random() * 100;
			const y = Math.random() * 100;

			return (
				<motion.div
					key={i}
					className={`${styles.bubble} rounded-full`}
					style={{
						'--bubble-left': `${x}%`,
						'--bubble-top': `${y}%`,
						'--bubble-size': `${size}px`,
						'--bubble-color': color,
					} as React.CSSProperties}
					custom={i}
					variants={animated ? bubbleVariants : undefined}
					initial={animated ? 'hidden' : undefined}
					animate={animated ? 'visible' : undefined}
					whileInView={animated ? floatingAnimation(i) : undefined}
					viewport={{ once: false }}
				/>
			);
		});
	};

	return (
		<div className={`${styles['bubble-container']} ${className}`}>{generateBubbles()}</div>
	);
};

export default FloatingBubbles;
