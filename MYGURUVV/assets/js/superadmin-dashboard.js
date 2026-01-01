  function toggleSidebarMobile() {
                document.getElementById("sidebar").classList.toggle("active");
                document.getElementById("overlay").classList.toggle("active");
            }

            function toggleSidebar() {
                const sidebar = document.getElementById("sidebar");
                if (window.innerWidth < 768) {
                    toggleSidebarMobile();
                } else {
                    sidebar.classList.toggle("collapsed");
                    document.getElementById("mainContent").classList.toggle("collapsed");
                }
            }

            function logout() {
                window.location.href = "login.html"; // replace with your actual login page path
            }
       

    //   <!-- Count-up Animation -->

            document.addEventListener("DOMContentLoaded", () => {
                const counters = document.querySelectorAll(".count-up");

                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute("data-count");
                        const current = +counter.innerText.replace("+", "");
                        const increment = Math.ceil(target / 100);

                        if (current < target) {
                            counter.innerText = `${current + increment}+`;
                            setTimeout(updateCount, 30);
                        } else {
                            counter.innerText = `${target}+`;
                        }
                    };

                    updateCount();
                });
            });