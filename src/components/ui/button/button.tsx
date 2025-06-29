'use client';

import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/utils/app.utils';
import styles from './button.module.css';
import { ButtonProps } from './button.types';

/**
 * Button component with various visual styles and sizes
 *
 * @example
 * ```tsx
 * <Button variant="default" size="default">Click me</Button>
 * <Button variant="outline" size="sm">Small outline button</Button>
 * <Button variant="ghost" asChild><a href="/">Link styled as button</a></Button>
 * ```
 */
const Button = memo(
  React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
      const Comp = asChild ? Slot : 'button';

      // Memoize the className calculation to avoid unnecessary recalculations
      const buttonClassName = useMemo(() => {
        return cn(
          styles['button-base'],
          styles[`button-${variant}`],
          styles[`button-size-${size}`],
          className
        );
      }, [variant, size, className]);

      return <Comp className={buttonClassName} ref={ref} {...props} />;
    }
  )
);

Button.displayName = 'Button';

export { Button };
export default Button;
