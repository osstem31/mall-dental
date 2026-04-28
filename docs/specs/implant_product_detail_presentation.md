---
marp: true
theme: default
paginate: true
backgroundColor: #ffffff
style: |
  h1 { color: #EB6100; }
  h2 { color: #1E1E1E; border-bottom: 2px solid #EB6100; padding-bottom: 5px; }
  section { font-family: 'Pretendard', sans-serif; }
---

# [화면설계서] 
## 임플란트 상품 상세 화면 (SCR-PROD-DET-001)

2026. 04. 27
오스템 치과몰 프로젝트 팀

---

# 1. 화면 개요

- **목표**: 임플란트 복합 규격의 직관적인 선택 및 주문 편의성 제공
- **핵심 기능**:
  - 고해상도 제품 갤러리
  - **계단식(Cascading)** 옵션 선택 시스템
  - 패키지별 실시간 가격 비교
  - 보험코드 즉시 조회 서비스

---

# 2. UI 레이아웃 구성

![w:800](https://placehold.co/800x400/DCE4F2/1E1E1E?text=Product+Detail+Layout+Overview)

- **상단 좌측**: 상품 이미지 갤러리 (메인 + 썸네일)
- **상단 우측**: 가격, 규격 선택, 주문 버튼 영역
- **하단 영역**: 상세정보 및 리뷰/Q&A 탭

---

# 3. 핵심 로직: 계단식 옵션 선택

사용자 실수를 방지하기 위한 **종속적 선택** 구조

1. **Size** (Mini/Regular) 선택
   - 하위 Diameter 옵션 필터링
2. **Diameter** (지름) 선택
   - 하위 Length 옵션 필터링
3. **Length** (길이) 선택
   - 최종 SKU 결정 및 리스트 추가

> **UX Point**: 불가능한 규격은 'X' 표시 및 비활성화 처리하여 탐색 비용 감소

---

# 4. 부가 기능 정의

### 4.1. 가격 비교 팝업
- 회원가 vs PKG(패키지) 적용가 실시간 비교
- 패키지 구매 유도를 통한 업셀링(Up-selling) 전략

### 4.2. 보험코드 조회
- 복잡한 보험코드를 별도 팝업으로 제공
- 규격별 매핑 테이블을 통해 오주문 방지

---

# 5. 기대 효과 및 결론

- **사용성 향상**: 복잡한 규격을 3단계로 단순화하여 선택 오류 0% 지향
- **매출 증대**: 패키지 가격 노출을 통한 구매 단가 상승 유도
- **정보 신뢰도**: 실시간 재고 및 보험 정보 연동으로 고객 신뢰 확보

---

# Q&A
## 감사합니다.
