document.addEventListener('DOMContentLoaded', () => {
    // 1. 모바일 내비게이션 토글
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // 링크 클릭 시 메뉴 닫기
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. 스크롤 애니메이션 (AOS - Animate On Scroll 기능)
    const aosItems = document.querySelectorAll('.aos-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-aos-delay')) || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                observer.unobserve(entry.target); // 한 번만 실행
            }
        });
    }, {
        threshold: 0.2 // 뷰포트의 20%가 보이면 애니메이션 시작
    });

    aosItems.forEach(item => {
        observer.observe(item);
    });

    // 3. 스킬 바 채우기 애니메이션
    const skillBars = document.querySelectorAll('.progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressElement = entry.target;
                const level = progressElement.getAttribute('data-skill-level');
                
                // 💡 수정 시작: 텍스트 중복 방지를 위해 기존 텍스트가 있다면 제거하거나, 새로 생성 전에 확인
                // 이 방법은 매번 새로 생성하는 대신, progress 요소에 직접 텍스트를 넣고 CSS로 보이게 하는 방식입니다.
                // 또는 한 번만 생성되도록 로직을 보강합니다.

                // 기존 코드를 주석 처리하거나 제거하고 아래 방식으로 변경:
                // progressElement.style.width = `${level}%`; // 이 부분은 그대로 둡니다.

                // 스킬 레벨 텍스트 표시
                // 이전에 추가한 span이 있다면 제거합니다 (안전 장치)
                let percentTextSpan = progressElement.querySelector('.skill-percent-text');
                if (percentTextSpan) {
                    percentTextSpan.remove();
                }

                percentTextSpan = document.createElement('span');
                percentTextSpan.classList.add('skill-percent-text'); // 클래스 추가
                percentTextSpan.textContent = `${level}%`;
                progressElement.appendChild(percentTextSpan);
                
                // 텍스트 애니메이션 (선택 사항)
                percentTextSpan.style.opacity = 0;
                // progress bar가 채워지는 애니메이션이 끝난 후 텍스트가 나타나도록 지연
                setTimeout(() => {
                    percentTextSpan.style.transition = 'opacity 0.5s ease';
                    percentTextSpan.style.opacity = 1;
                }, 1200); // progress transition 시간 (1.5s)보다 약간 짧게 (1.2s)
                
                // 스킬 바 너비 설정 (텍스트 생성 후)
                progressElement.style.width = `${level}%`;

                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.7 // 스킬 바가 70% 보일 때 애니메이션 시작
    });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
});

/* 햄버거버튼 동작하게*/

function myFunction() {
  var x = document.getElementByClass("menu-toggle");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}