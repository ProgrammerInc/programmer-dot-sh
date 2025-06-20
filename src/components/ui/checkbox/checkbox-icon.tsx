'use client';

import { Check } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/utils/app.utils';
import styles from './checkbox.module.css';
import { CheckboxIconProps } from './checkbox.types';

/**
 * CheckboxIcon component
 *
 * Icon displayed inside the checkbox when checked
 */
export const CheckboxIcon = React.forwardRef<SVGSVGElement, CheckboxIconProps>(
  ({ className, ...props }, ref) => {
    return <Check ref={ref} className={cn(styles.icon, className)} {...props} />;
  }
);

CheckboxIcon.displayName = 'CheckboxIcon';
