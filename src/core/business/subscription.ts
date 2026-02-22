import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';

export type SubscriptionStatus = 'active' | 'expired' | 'grace_period' | 'inactive';

export interface SubscriptionCheckResult {
    status: SubscriptionStatus;
    isAccessAllowed: boolean;
    daysRemaining?: number;
}

/**
 * Validates the school's subscription status.
 */
export function checkSubscription(data: TenantViewModel): SubscriptionCheckResult {
    const { school } = data;

    // 1. Check if the school is explicitly inactive
    if (!school.isActive) {
        return {
            status: 'inactive',
            isAccessAllowed: false,
        };
    }

    // 2. Check for expiration
    if (school.expirationDate) {
        const now = new Date();
        const expiry = new Date(school.expirationDate);

        if (now > expiry) {
            // Check grace period
            const diffInMs = now.getTime() - expiry.getTime();
            const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

            if (diffInDays <= school.gracePeriodDays) {
                return {
                    status: 'grace_period',
                    isAccessAllowed: true,
                    daysRemaining: school.gracePeriodDays - diffInDays,
                };
            } else {
                return {
                    status: 'expired',
                    isAccessAllowed: false,
                };
            }
        }
    }

    // 3. Otherwise, it's active
    return {
        status: 'active',
        isAccessAllowed: true,
    };
}
