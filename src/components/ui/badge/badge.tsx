'use client';

import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils/app.utils';
import { badgeVariants } from './badge.variants';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };

export default Badge;
