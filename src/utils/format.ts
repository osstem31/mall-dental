/**
 * 관련자료 개수를 포맷팅합니다.
 * 999개를 초과하면 '999+'를 반환하고, 그 외에는 숫자 문자열을 반환합니다.
 */
export const formatRelatedCount = (count: number): string => {
    if (count > 999) {
        return '999+';
    }
    return count.toString();
};
