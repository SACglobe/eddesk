/**
 * Utility for calculating discounted prices for plans.
 */

export interface PlanDiscount {
  discount_type?: 'none' | 'percentage' | 'flat' | 'free_days' | 'free_months';
  discount_percentage?: number;
  discount_flat?: number;
  discount_free_days?: number;
  discount_free_months?: number;
  discount_label?: string;
  discount_active?: boolean;
  discount_expires_at?: string;
  price: number;
}

export interface DiscountResult {
  originalPrice: number;
  finalPrice: number;
  discountAmount: number;
  hasDiscount: boolean;
  discountLabel: string | null;
  discountType: string;
  freeMonths?: number;
  freeDays?: number;
  showStrikethrough: boolean;
  savingsLabel: string;
}

/**
 * Calculates the discounted price based on the specified user formulas.
 * @param plan The plan object from DB
 */
export function getDiscountedPrice(plan: any): DiscountResult {
  const price = parseFloat(plan.price) || 0;
  const isActive = plan.discount_active === true;
  const type = plan.discount_type || 'none';
  
  let finalPrice = price;
  let originalPrice = price;
  let discountAmount = 0;
  let showStrikethrough = false;
  let savingsLabel = '';

  if (isActive && type !== 'none') {
    switch (type) {
      case 'flat': {
        const flatDiscount = parseFloat(plan.discount_flat) || 0;
        finalPrice = price - flatDiscount;
        discountAmount = flatDiscount;
        showStrikethrough = discountAmount > 0;
        savingsLabel = discountAmount > 0 ? `🔥 Save ${formatPrice(flatDiscount)} instantly` : '';
        break;
      }

      case 'percentage': {
        const percentage = plan.discount_percentage || 0;
        const pDiscount = (price * percentage) / 100;
        finalPrice = price - pDiscount;
        discountAmount = pDiscount;
        showStrikethrough = discountAmount > 0;
        savingsLabel = discountAmount > 0 ? `🔥 Save ${percentage}% on your plan` : '';
        break;
      }

      case 'free_months': {
        const months = plan.discount_free_months || 0;
        if (plan.billingcycle === 'yearly' && months > 0) {
          finalPrice = price - ((price / 12) * months);
          discountAmount = price - finalPrice;
          showStrikethrough = true;
          savingsLabel = `🔥 Save ${formatPrice(discountAmount)} with Annual Billing`; 
        }
        break;
      }
      
      default:
        break;
    }
  }

  return {
    originalPrice,
    finalPrice,
    discountAmount,
    hasDiscount: isActive && type !== 'none' && finalPrice < price,
    discountLabel: plan.discount_label || null,
    discountType: type,
    freeMonths: plan.discount_free_months,
    freeDays: plan.discount_free_days,
    showStrikethrough,
    savingsLabel
  };
}

/**
 * Formats a number as an Indian Rupee currency string.
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}
