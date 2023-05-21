from faker import Faker
from django.contrib.auth.models import User


def replace_quotes(text):
    return text.replace("'", "`")


if __name__ == '__main__':
        fake = Faker()
        fake.add_provider(replace_quotes)
        batch_size = 1000
        with open('users.sql', 'w') as file:
                sql = """TRUNCATE TABLE "Music_app_userprofile" RESTART IDENTITY CASCADE;\n """
        file.write(sql + "\n")

        for i in range(0, 10000, 1000):
                users = []
                for j in range(i, i+1000):
                        first_name = replace_quotes(fake.first_name())
                        last_name = replace_quotes(fake.last_name())
                        date_of_birth = fake.date_of_birth().strftime('%Y-%m-%d')
                        location = replace_quotes(fake.city())
                        bio = replace_quotes(fake.text(max_nb_chars=200))
                        # Generate username and password
                        username = f"{first_name.lower()}{last_name.lower()}"
                        password = "Password123"

                        # Create user object
                        user = User.objects.create_user(username=username, password=password)
                        users.append(f"('{first_name}', '{last_name}', '{date_of_birth}', '{location}', '{bio}', '{username}')")
                data = f"""INSERT INTO "Music_app_userprofile" (first_name, last_name, date_of_birth, location, bio, user_id) VALUES {','.join(users)};"""
                file.write(data + "\n")


        print("Users added")
        file.write("SELECT 'users done!' as msg;\n")