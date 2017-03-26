package com.eighthour.makers.thedays

import com.eighthour.makers.thedays.ui.acitivities.MainActivity
import dagger.Component
import javax.inject.Singleton

@Singleton
@Component(modules = arrayOf(ApplicationModule::class) )
interface ApplicationComponent {

    fun inject(app : App)

    fun inject(activity : MainActivity)


    object Initializer {
        fun init(app: App): ApplicationComponent =
                DaggerApplicationComponent.builder()
                        .applicationModule(ApplicationModule(app))
                        .build()
    }
}